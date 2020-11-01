//認証処理(全てのpageの認証はごちを通ってbackendに行く)
import React, { useEffect } from "react";
//import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_action/user_action";

export default function (SpecificComponent, option, adminRoute = null) {
  //optionについて
  //null ->誰でも利用かのなページ
  //true ->loginしたユーザーのみ利用可能
  //false ->loginしたユーザーは利用不可

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    useEffect(() => {
      // Axios.get("api/users/auth")よりdispatchを作成
      //_actionで作成したauthを使う
      dispatch(auth()).then((response) => {
        console.log(response);

        //not login
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          //login
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
