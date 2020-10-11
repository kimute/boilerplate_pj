const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");
const { auth } = require("./middleware/auth");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");

//clientから来る情報をサーバーで分析しもらえる処理
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world??"));

//会員登録のためのrouterを作成
//endpointはresgisterにする
app.post("/api/users/register", (req, res) => {
  // 会員情報をclientからget　→　データーベースに入れる
  //body-parserによりjson形式のデーターがDBに入られる
  const user = new User(req.body);

  //以下はmongoDBで使うmethode
  //userモデルにsave
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//login

app.post("/api/users/login", (req, res) => {
  //リクエストしたログイン情報(user)がDBにあるのかをチェック
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "一致するユーザーはいません",
      });
    }
    //user情報がDBにあった場合以下のように処理
    user.comparePassword(req.body.password, (err, isMatch) => {
      //User.jsで作成したmethodeを以下のように使う
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "パスワードが一致していません",
        });

      //パスワードが一致したらtokenを生成
      //userモデルにも以下のmethodを作成
      //JSONWEBTOKEN ライブラリーを使う
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //tokenをどこえへ入れるか？cookie? ,session, localstorage?
        //色ろ論難があるかとりあえずcookie
        //cookie parserが必要となる
        //以下のように任意の名前(x_auth)でuser.tokenをcookieに入れよう
        res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
      });
    }); //
  });
});

//role:0 ->一番user role:1 ->admin
app.get("/api/users/auth", auth, (req, res) => {
  //req.user._idが書けるのはauth.jsで処理したから
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

//logout function
//tokenを削除することでlogout 出来る

app.get("/api/users/logout", auth, (req, res) => {
    // console.log('req.user', req.user)
    User.findOneAndUpdate({ _id: req.user._id },
      { token: "" }
      , (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
          success: true
        })
      })
  })

app.listen(port, () => console.log(`Express app listening port ${port}`));
