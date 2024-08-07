import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/Styles/Navbar.css';
// import AddJob from './Components/hcdPages/AddJob';
// import Dashboard from './Components/hcdPages/Dashboard';
import navbarLogo from '../Assets/Images/r17panjang.png';

export default function Navbar() {
  return (
    <div className='header'>
      <div className='navbar'>
        <img src={navbarLogo} alt="" />
        <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/">Add Job</Link>
            <Link to="/posted-job">Career</Link>
        </nav>
      </div>
    </div>
  );
}
