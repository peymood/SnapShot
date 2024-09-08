import { Menu } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
  return (
    <div className="navbar">

        <Menu mode="horizontal" theme="light" className="navbar-menu" 
              style={{ justifyContent: 'flex-end', fontSize:"1.1rem" }} >
            <MenuItem>
                <Link to="/" > ورود به حساب کاربری</Link>
            </MenuItem>
        </Menu>
    </div>
  )
}

export default NavBar
