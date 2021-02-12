import React, { Component } from "react";
import Navigation from "../component/Navigation";
import { USER } from "../config/UrlConfig";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleChange(e) {
    const name = e.target.name,
      value = e.target.value;
    this.setState({ msg: "" });
    this.setState({ [name]: value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const result = await fetch(`${USER}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    });
    if (result.status === 200) {
      const data = await result.json();
      const { authToken, refreshToken, username , role} = data;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("username", username );
      localStorage.setItem("role", role);
      if(role === "admin") {
        return this.props.history.push('/admin');
      }
      this.props.history.push('/private');
    }
    if (result.status === 400) {
      this.setState({
        msg:
          "Email or password is blank or they doesn't fill the requirements.",
      });
    }

    if(result.status === 404) {
      this.setState({msg: "You have enter the wrong credentials."});
    }
  }
  handleReset() {
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ msg: "" });
  }
  render() {
    return (
      <div className="form">
        <Navigation />
        <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
          <div className="f-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="f-input"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="f-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="f-input"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="f-button">
            <input
              type="button"
              value="Reset"
              className="danger"
              onClick={this.handleReset}
            />
            <input type="submit" value="Login" className="primary" />
          </div>
          {this.state.msg ? (
            <div className="error">
              <p>{this.state.msg}</p>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
export default Login;
