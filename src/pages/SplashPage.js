
import React, { Component } from "react";
import { Link } from "react-router-dom";


function SplashPage() {
  return (
    <div className="logo" > 
      <Link className="textLogo" to={"/login"} >U-ON</Link>
    </div>
  )
}

export default SplashPage;