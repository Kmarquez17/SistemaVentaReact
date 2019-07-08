import React, { Component } from "react";
import AuthService from "../services/AuthService";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authService = new AuthService();
  }

  render() {
    return (
      <Card
        style={{
          width: "40%",
          height: "30%",
          marginLeft: "calc(50% - 20%)",
          marginTop: "15%"
        }}
      >
        <div style={{ textAlign: "center" }}>
          <CardHeader
            title="Accesso al sistema"
            style={{ backgroundColor: indigo[500] }}
          />
        </div>
        <CardContent>
          <form onSubmit={this.handleSubmit}>
            <TextField
              style={{ width: "100%" }}
              type="text"
              label="Email"
              name="email"
              onChange={this.handleChange}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              type="password"
              label="Password"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <br />
            <div style={{ textAlign: "right" }}>
              <Button type="submit" variant="contained" color="primary">
                Ingresar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.authService
      .login(this.state.email, this.state.password)
      .then(resp => {
        this.props.onAuthChange();
        this.props.history.replace("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default withRouter(Login);
