import React from 'react'
import { Link } from 'react-router-dom'
function Landingscreen() {
  return (
    <div className='row landing'>
<div className="col-md-12 text-center">
    <h3 style={{color:'white',fontSize:'100px'}}>Shiv Rooms</h3>
    <h1 style={{color:'white'}}>"Hotel rooms are a second home, only you get to escape.</h1>
    <Link to={'/home'}>
    <button className='btn btn-light mt-3'>Get Started</button>
    </Link>
</div>
    </div>
  )
}

export default Landingscreen