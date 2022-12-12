import React from 'react';
import "./DefaultLayout.css";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function DefaultLayout(props) {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate("/login");
    localStorage.clear();

  }
  const user = JSON.parse(localStorage.getItem("expense-user"))
  return (
    <div className='layout'>
      <div className='header d-flex justify-content-between align-items-center'>
        <h1 className='logo'>Expense Tracker</h1>
        <div class="dropdown">
          <button class="dropbtn ">{user.name}</button>
          <div class="dropdown-content">
            <a onClick={handleClick}><LogoutIcon /></a>
          </div>
        </div>

      </div>

      <div className='content'>{props.children}</div>
    </div>
  )
}

export default DefaultLayout;