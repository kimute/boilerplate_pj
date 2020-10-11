const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //暗号化文字数を設定
const jwt = require("jsonwebtoken"); //token生成

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  //adminを決めるため設定
  role: {
    type: Number,
    default: 0,
  },
  //imageの場合以下のように簡単に設定可能
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//modelはSchemaを包む
//ファイルの名前とschemaを下記のようにいれる

//bcryptを使うためuser.saveをする前に暗号化が必要
//以下のように処理
userSchema.pre("save", function (next) {
  var user = this; //入力ひた時のパスワードつまりschema: password
  //password 暗号化
  //Schemaのuser passwordを更新した時のみpaawordを暗号化
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      //user.password:入力ひた時のパスワード
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        //hash化されたパスワードを入れる
        user.password = hash;
        next(); //index.jsにreturn
      });
    }); // end bcrypt
  } else {
    next();
  }
});

//plainPassword:loginする時に入力したパスワード
//cd:callback function
userSchema.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

//token
userSchema.methods.generateToken = function (cb) {
  //jsonwebtokeを使ってtokenを生成
  var user = this;
  //_idはmongoDBからもらったID
  //secertTokenと組み合わせてtokenを生成
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  //user._id + ''seretToeken = token
  //'secretToken' -> user._idが検索可能になる

  //user Schemaのtokenに入れる
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    //エラーでは無い場合
    cb(null, user);
    //こちのuserはindex.jsのgenerateToken関数で使われる
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //tokenをdecodeする
  jwt.verify(token, "secretToken", function (err, decoded) {
    //mongoDBの関数findOneを使ってuserを探す
    //クライアントから持ってきたtokenとDBにあるtokenが一致するのか確認する
    user.findOne({
      "_id": decoded,
      "token": token},
      function(err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
