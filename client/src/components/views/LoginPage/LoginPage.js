import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_action/user_action";

function LoginPage(props) {
  const dispatch = useDispatch();

  //class基盤のprops設定を reaxk hooksで作成
  //以下をvalueに設定
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log("Email", Email);
    // console.log("Password", Password);
    // action folderに loginUser actionを作成

    let body = {
      email: Email,
      password: Password,
    };

    //loginが成功したら次のように処理
    //loginUser from action/user_action.js
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
