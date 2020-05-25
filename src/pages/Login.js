import React, { Component } from "react";
import { withAuth } from './../lib/Auth';
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
    // this.props.login method is coming from the AuthProvider
    // injected by the withAuth() HOC
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login">

        <form onSubmit={this.handleFormSubmit}>
         <div className="divform">
          <label className="labelform">Username:</label>
          <input type="text" className="inputForm" name="username" value={username} onChange={this.handleChange} />
          </div>
         <div className="divform">
          <label className="labelform" >Password:</label>
          <input type="password" className="inputForm" name="password" value={password} onChange={this.handleChange} />
          </div>
         <div >
          <input type="submit" className="submit" value="Login" />
          </div>
          <Link to="/signup">
              {" "}
              <button className="redirectButton">Sign Up</button>{" "}
            </Link>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);

