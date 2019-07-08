import React, { Component } from "react";
import "./App.css";
import AuthService from "./service/AuthService";
// import Home from "./components/Home";
import Login from "./components/Login";
import UserNav from "./components/UserNav";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new AuthService();
    this.state = { auth: this.auth.isLoggedIn() };
    this.onAuthChange = this.onAuthChange.bind(this);
  }

  onAuthChange() {
    this.setState({ auth: this.auth.isLoggedIn() });
  }

  render() {
    if (this.state.auth) {
      return <UserNav onAuthChange={this.onAuthChange} />;
    }
    return (
      <Router>
        <Switch>
          <Route
            path="/Login"
            render={routerProps => (
              <Login {...routerProps} onAuthChange={this.onAuthChange} />
            )}
          />
          <Redirect from="*" to="/Login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
