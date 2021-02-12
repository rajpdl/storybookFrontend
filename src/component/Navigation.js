import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navigation extends Component {
    render() {
        return(
            <nav>
            <ul>
            <li>
                <p>Hello {localStorage.getItem("username") || "Anonymous"}</p>
              </li>
              <li>
                <Link to="/">Public Story</Link>
              </li>
              
              {localStorage.getItem("authToken") ? (
                <span>
                    <li>
                        <Link to="/private">Pirvate Story</Link>
                    </li>
                <li className="f-r">
                  <Link to="/logout">Logout</Link>
                </li>
                </span>
              ) : (
                <span>
                  <li className="f-r">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="f-r">
                    <Link to="/signup">SignUp</Link>
                  </li>
                </span>
              )}
            </ul>
          </nav>
        );
    }
}

export default Navigation;