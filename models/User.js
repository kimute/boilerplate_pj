const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema);

module.exports = { User };
