import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";


class Signup extends Component {
  state = { username: "", password: "", email: "", tel: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, email, tel } = this.state;

    this.props.signup(username, password, email, tel);
    // this.props.signup method is coming from the AuthProvider
    // injected by the withAuth() HOC
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password, email, tel } = this.state;
    return (
      <div className="signup">
      

        <form onSubmit={this.handleFormSubmit}>
          <div className="divform">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          </div>
          <div className="divform">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          </div>
          <div className="divform">
          <label>email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          </div>
          <div className="divform">
          <label>tel:</label>
          <input
            type="text"
            name="tel"
            value={tel}
            onChange={this.handleChange}
          />
          </div>
          <input type="submit" className="submit" value="Signup" />
          <Link to="/login">
              {" "}
              <button className="redirectButton">Login</button>{" "}
            </Link>
        </form>
        
      </div>
    );
  }
}

export default withAuth(Signup);
