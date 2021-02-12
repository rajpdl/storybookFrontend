import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AdminNavigation from '../../component/AdminNavigation';
import { USER } from '../../config/UrlConfig';

class AdminCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            role: 'user',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const name = e.target.name,
            value = e.target.value;
        this.setState({[name]: value});
    }   
    async handleSubmit(e) {
        e.preventDefault();
        const result = await fetch(`${USER}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                role: this.state.role,
                password: this.state.password
            })
        });
        if(result.status === 200) {
            this.props.history.push('/admin');
        }
        if(result.status === 400) {
            this.setState({msg: "Id is not found."})
        }
        if(result.status === 401) {
            this.props.history.push('/login');
        }
        if(result.status === 404) {
            this.setState({msg: "Unable to find."})
        }
    }
    handleDiscard() {
        this.setState({username: ''});
        this.setState({email: ''});
        this.setState({role: 'user'});
        this.setState({password: ''});
    }
    render() {
        if(localStorage.getItem('role') !== 'admin') {
            return <Redirect to="/login" />
        }
        return(
            <div className="container">
                <AdminNavigation />
                <div className="row">
                    
                <form onSubmit={this.handleSubmit}>
                <h1>Create New User</h1>
                    <div className="f-field">
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={this.state.username} className="f-input"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="f-field">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" value={this.state.email} className="f-input"
                        onChange={this.handleChange} />
                    </div>
                    <div className="f-field">
                        <label htmlFor="role">Role:</label>
                        <select name="role" value={this.state.role} onChange={this.handleChange} className="f-input">
                            <option value="">Select One</option>
                            <option value="user">USER</option>
                            <option value="admin" >ADMIN</option>
                        </select>
                    </div>
                    <div className="f-field">
                        <label htmlFor="password">Password:</label>
                        <input type="text" className="f-input" name="password" value={this.state.password} 
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="b-group">
                        <input type="button" value="Discard Changes" className="danger" onClick={this.handleDiscard} />
                        <input type="submit" className="primary" value="Save Changes" />
                    </div>
                </form>
                </div>
            </div>
        );
    }
}

export default AdminCreate;