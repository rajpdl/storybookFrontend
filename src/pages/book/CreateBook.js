import React, { Component } from "react";
import Navigation from "../../component/Navigation";
import { BOOK } from '../../config/UrlConfig';
import { withRouter } from 'react-router-dom';

class EditBook extends Component {
    constructor(props) {
        super(props);

        this.state = {   
            title: '',
            allowComment: true,
            status: 'public',
            detail: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
    }
    

    handleChange(e) {
        const name = e.target.name,
            value = e.target.value;
            this.setState({msg: ''});
        if(name === "allowComment" && value === "on") {
            this.setState({allowComment: true});
        }
        if(name === "notAllowComment" && value === "on") {
            this.setState({allowComment: false});
        }
        this.setState({[name]: value});
    }
    async handleSubmit(e) {
        e.preventDefault();
        const result = await fetch(`${BOOK}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                title: this.state.title,
                detail: this.state.detail,
                status: this.state.status,
                allowComment: this.state.allowComment
            })
        });
        if(result.status === 200) {
            console.log(await result.json());
            this.props.history.push('/private');
        }
        if(result.status === 400) {
            this.setState({msg: "Please input the form."});
        }
        if(result.status === 401) {
            this.props.history.push('/login');
        }
    }
    handleDiscard() {
        this.setState({title: ''});
        this.setState({detail: ''});
        this.setState({status: ''});
        this.setState({allowComment: true});
    }
    render() {
        return(
            <div>
                <Navigation />
                {this.state.msg? 
                <div className="message">
                    <p>{this.state.msg}</p>
                    </div>    :
                    null
            }
                <form onSubmit={this.handleSubmit}>
                    
                    <div className="f-field">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={this.state.title} className="f-input"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="f-field">
                        <label htmlFor="allowComment">Allow Comment:</label>
                        <input type="radio" name="allowComment" defaultValue={true} checked={this.state.allowComment? true: false}
                            onChange={this.handleChange}
                        /> True
                        <input type="radio" name="notAllowComment" 
                            checked={!this.state.allowComment? true: false}
                            defaultValue={false}
                            onChange={this.handleChange}
                        /> False
                    </div>
                    <div className="f-field">
                        <label htmlFor="status">Status:</label>
                        <select name="status" value={this.state.status} onChange={this.handleChange} className="f-input">
                            <option value="">Select One</option>
                            <option value="public" >PUBLIC</option>
                            <option value="private" >PRIVATE</option>
                            <option value="unpublished">UNPUBLISHED</option>
                        </select>
                    </div>
                    <div className="f-field">
                        <label htmlFor="detail">Detail:</label>
                        <textarea className="f-input" rows="12"
                        name="detail"
                            value={this.state.detail}
                            onChange={this.handleChange}
                        >
                        </textarea>
                    </div>
                    <div className="b-group">
                        <input type="button" value="Discard Changes" className="secondary" onClick={this.handleDiscard}/>
                        <input type="submit" className="primary" value="Save" />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(EditBook);