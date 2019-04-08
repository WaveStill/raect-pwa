import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { registerSw } from "./core/registerSw";

import Home from "./pages/Home/index.js";
import Page1 from "./pages/Page/index.js";

const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">首页</Link>
        </li>
        <li>
          <Link to="/page1">Page1</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/page1" component={Page1} />
      </Switch>
    </div>
  </Router>
);

//document.getElementById('app').innerHTML = "Webpack works"

ReactDom.render(getRouter(), document.getElementById("app"));

registerSw();
