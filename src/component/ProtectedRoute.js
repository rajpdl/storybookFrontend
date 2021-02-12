import React, { Component } from 'react';
import { Redirect, Route} from 'react-router-dom';

class ProtectedRoute extends Component {
    render() {
        const component = this.props.component;
        let Authenticated = localStorage.getItem('authToken');
        return Authenticated? <Route component={component} />:
             <Redirect to='/login' />
        
    }
}

export default ProtectedRoute;