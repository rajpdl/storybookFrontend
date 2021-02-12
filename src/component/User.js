import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }
        this.handleEdit = this.handleEdit.bind(this);
    }
    handleEdit() {
        this.props.history.push(`/admin/edit/${this.state.id}`, {
            id: this.state.id
        });
    }
    render() {
        return(
            <div className="c-card">
                <h2>{this.props.username}</h2>
                <p>{this.props.email}</p>
                <p>Role : {this.props.role}</p>
                <button className="primary" onClick={this.handleEdit}>Edit</button>
            </div>
        );
    }
}


export default withRouter(User);