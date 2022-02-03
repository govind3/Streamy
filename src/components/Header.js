import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header=()=> {
  return (
      <div className="ui secondary menu" >
        <Link to="/" className="active item">
          Streamy
        </Link>
        <div className="right menu">
          <Link to="/" className="item">
            All Streams
          </Link>
          <GoogleAuth />
        </div>
    </div>
  );
}

export default Header;


//707205558890-7nbcmge3vkjtqutvme0taj3dqapi765a.apps.googleusercontent.com