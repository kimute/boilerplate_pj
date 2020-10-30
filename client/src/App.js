import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/Register";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* <LandingPage/>よりcomponentに入れた方がきれいに見る */}
          <Route exact path="/" component={LandingPage}>
            {/* <LandingPage /> */}
          </Route>
          <Route path="/login" component={LoginPage}>
            {/* <LoginPage /> */}
          </Route>
          <Route path="/register" component={RegisterPage}>
            {/* <RegisterPage /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
