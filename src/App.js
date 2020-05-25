import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SplashPage from "./pages/SplashPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SearchPage from "./pages/SearchPage";
import UserPage from "./pages/UserPage";
import ItemDetailPage from "./pages/ItemDetailPage";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <PublicRoute exact path="/" component={SplashPage} />
          <PrivateRoute exact path="/search" component={SearchPage} />
          <PrivateRoute exact path="/profile" component={UserPage} />
          <PrivateRoute exact path="/item/:id" component={ItemDetailPage} />
          <PublicRoute exact path="/signup" component={Signup} />
          <PublicRoute exact path="/login" component={Login} />
        </Switch>
       
      </div>
    );
  }
}

export default App;
