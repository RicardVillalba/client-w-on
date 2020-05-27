import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import Search from "../images/search.jpg";
import Profile from "../images/profile.png";

class Navbar extends Component {
  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider
    // and are injected by the withAuth HOC
    const { logout, isLoggedIn } = this.props;

    return (
      <nav className="navbar">
        
        
        {isLoggedIn ? (
          <div className="navbarbutton">
           <div>
           <Link to={"/login"} >U-ON</Link>
           </div>
            <Link to={"/profile"} >
               <img className="navbarLinks" src={Profile} alt="profile"/>
            </Link>
            <Link to={"/search"}> 
              <div>
              <img className="navbarLinks" src={Search} alt="search"/>
              </div>
            </Link>
             
            <button onClick={logout} className="logoutButton"> Logout </button>
            
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

