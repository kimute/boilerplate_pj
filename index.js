const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//clientから来る情報をサーバーで分析しもらえる処理
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

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
app.post("/register", (req, res) => {
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

app.listen(port, () => console.log(`Express app listening port ${port}`));
