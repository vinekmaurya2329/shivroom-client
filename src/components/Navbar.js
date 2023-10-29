import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';



// import { json } from "react-router-dom";

function Navbar() {
 
  const user = JSON.parse(localStorage.getItem('currentUser'));
  function logout(){
    localStorage.removeItem('currentUser');
    window.location.href='/login'
  }
  return (
    <div>
  <nav className="navbar navbar-expand-lg ">
    <div className="container-fluid">
      <a className="navbar-brand text-light" href="/">
      Shiv Rooms
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa-solid fa-bars fa-beat" style={{color:' #d4dbe8'}}></i>
      
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
        {user ? (<>
          <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
         <i className="fa fa-user"></i> {user.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        <Dropdown.Item href="" onClick={logout}>Log Out </Dropdown.Item>
        <Dropdown.Item href="/admin">Admin Controls</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>

        
        </>):(<>
            <li className="nav-item">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
          
          </>)}
        </ul>
      </div>
    </div>
  </nav>
</div>

  );
}

export default Navbar;
