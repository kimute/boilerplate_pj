import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../_action/user_action";

function Register(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onConfrimPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("パスワードが一致してません！");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    //reduxを使わない時には以下のようにする
    //Axios.post("/api/users/register", body);

    //reduxは以下ように設定
    dispatch(registerUser(body)).then((response) => {
        if (response.payload.success) {
          props.history.push("/login");
        } else {
          alert("Fail to sign up");
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

        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfrimPasswordHandler}
        />
        <br />
        <button type="submit">Join Us</button>
      </form>
    </div>
  );
}

export default Register;
