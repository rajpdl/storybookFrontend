import React, { Component } from 'react';
import { USER } from '../../config/UrlConfig';
import AdminNavigation from './../../component/AdminNavigation';

class AdminEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.id,
            username: '',
            role: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    async componentDidMount() {
        this.initFetch();
    }
    async initFetch() {
        const result = await fetch(`${USER}/${this.state.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        });
        if(result.status === 200) {
            const { username, role, password, email} = await result.json();
            this.setState({username});
            this.setState({role});
            this.setState({password});
            this.setState({email});
        }
        if(result.status === 400) {
            this.setState({msg: "Id is not valid."})
        }
        if(result.status === 404) {
            this.setState({msg: "Unable to find."})
        }
    }
    handleChange(e) {
        const name = e.target.name,
            value = e.target.value;
        this.setState({[name]: value});
    }
    handleDiscard() {
        this.initFetch();
    }
    async handleSubmit(e) {
        e.preventDefault();
        const result = await fetch(`${USER}/${this.state.id}`, {
            method: 'POST' ,
            headers: {
                'Content-Type': 'application/json',
                'x-auth': localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
            })
        });

        if(result.status === 200) {
            this.props.history.push('/admin');
        }
        if(result.status === 400) {
            this.setState({msg: "Id is not found."})
        }
        if(result.status === 404) {
            this.setState({msg: "Unable to find."})
        }
    }
    async handleDelete() {
        const result = await fetch(`${USER}/${this.state.id}`, {
            method: 'DELETE',
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        });
        if(result.status === 200) {
            this.props.history.push('/admin');
        }
        if(result.status === 401) {
            this.props.history.push('/login');
        }
        if(result.status === 400) {
            this.setState({msg: "Id is not found."})
        }
        if(result.status === 404) {
            this.setState({msg: "Unable to find."})
        }

    }
    render() {
        return(
            <div className="container">
                <AdminNavigation />
                <div className="row">
                    {this.state.msg? 
                    <div className="message">
                    <p>{this.state.msg}</p>
                </div>
                :
                <form onSubmit={this.handleSubmit}>
                <h1>Edit User</h1>
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
                            <option value="user" >USER</option>
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
                        <input type="button" value="Delete" className="secondary" onClick={this.handleDelete} />
                        <input type="button" value="Discard Changes" className="danger" onClick={this.handleDiscard} />
                        <input type="submit" className="primary" value="Save Changes" />
                    </div>
                </form>
                }
                
                </div>
            </div>
        );
    }
}

export default AdminEdit;