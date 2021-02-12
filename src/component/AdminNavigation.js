import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class AdminNavigation extends Component {
    render() {
        return(
            <nav>
            <ul>
                <li>
                    <Link to="/admin" >Home</Link>
                </li>
                <li className="f-r">
                  <Link to="/logout">Logout</Link>
                  </li>    
            <li className='f-r'>
                <p>Hello {localStorage.getItem("username") || "Anonymous"}</p>
              </li>
              <li>
                  <Link to="/admin/create">Create New</Link>
              </li>
              
            </ul>
          </nav>
        );
    }
}

export default AdminNavigation;