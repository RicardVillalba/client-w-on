import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";

class Navbar extends Component {
  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider
    // and are injected by the withAuth HOC
    const { user, logout, isLoggedIn } = this.props;

    return (
      <nav className="navbar">
        
        
        {isLoggedIn ? (
          
          <div className="navbarbutton">
            
            <Link to={"/profile"} >
               <img src="../../images/profile.jpg" alt="profile" />
            </Link>
            <Link to={"/search"}> 
              <img src="../../images/search.jpg" alt="search" />
            </Link>
             <Link to={"/"} >
            <button onClick={logout}> Logout </button>
            </Link>
          </div>
        ) : (
          <>
          
            
          </>
        )}
    
      </nav>
    );
  }
}

export default withAuth(Navbar);

