const { User } = require("../models/User");

let auth = (req, res, next) => {
  //認証処理をする
  //client cookieからtokenをもらう
  let token = req.cookies.x_auth;

  //token decode and find user
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    //userがあった場合以下のように処理

    req.token=token;
    req.user=user;
    next();//←これをする理由:middlewareだから、役割が終わった後に次のfunctionにうつるよう
  }); //Userのモデルにも同じ物を作成
};

module.exports = { auth };
