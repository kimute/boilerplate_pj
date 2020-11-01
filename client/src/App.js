import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/Register";
import auth from "./hoc/auth";

//Authを使って認証チェック, hoc/auth.jsを参考
//component={LandingPage} -> component={auth(LandingPage)}
function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <LandingPage/>よりcomponentに入れた方がきれいに見る */}
          <Route exact path="/" component={auth(LandingPage, null)}>
            {/* <LandingPage /> */}
          </Route>
          <Route path="/login" component={auth(LoginPage, false)}>
            {/* <LoginPage /> */}
          </Route>
          <Route path="/register" component={auth(RegisterPage, false)}>
            {/* <RegisterPage /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
