import React, { useEffect } from "react";
import axios from "axios";
//history.pushを使うためreact-routrt-domが必要
import {withRouter} from "react-router-dom";


function LandingPage(props) {
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response));
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("Log out failed...");
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
      <h2>Start Page</h2>
      <br />
      <button onClick={onClickHandler}>Log out</button>
    </div>
  );
}

export default withRouter(LandingPage);
