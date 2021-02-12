import React, { Component } from "react";
import Navigation from "../../component/Navigation";
import { BOOK } from '../../config/UrlConfig';

class EditBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.location.state.id            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDiscard = this.handleDiscard.bind(this);
    }
    async componentDidMount() {
        this.initializeMount();
    }
    async initializeMount() {
        const result = await fetch(`${BOOK}/${this.state.id}`, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        });
        if(result.status === 200) {
            const { allowComment, title, detail, status } = await result.json();
            this.setState({allowComment});
            this.setState({title});
            this.setState({detail});
            this.setState({status});
        }
        if(result.status === 401) {
            this.props.history.push('/login');
        }
    }
    handleChange(e) {
        const name = e.target.name,
            value = e.target.value;
            if(name === 'title') {
                return alert("Title is not changeable.");
            }
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
        const result = await fetch(`${BOOK}/${this.state.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth': localStorage.getItem('authToken')
            },
            body: JSON.stringify({
                detail: this.state.detail,
                status: this.state.status,
                allowComment: this.state.allowComment
            })
        });
        if(result.status === 200) {
            this.props.history.push('/private');
        }
        if(result.status === 401) {
            this.props.history.push('/login');
        }

    }
    async handleDelete() {
        const result = await fetch(`${BOOK}/${this.state.id}`, {
            method: 'DELETE',
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        });
        if(result.status === 200) {
            this.props.history.push('/private');
        }
        if(result.status === 401) {
            this.props.history.push('/login');
        }
    }
    handleDiscard() {
        this.initializeMount();
    }
    render() {
        return(
            <div>
                <Navigation />
                <form onSubmit={this.handleSubmit}>
                    <div className="f-field">
                        <label htmlFor="title">Title:</label>
                        <input type="text" name="title" value={this.state.title} className="f-input"                            
                        />
                    </div>
                    <div className="f-field">
                        <label htmlFor="allowComment">Allow Comment:</label>
                        <input type="radio" name="allowComment" checked={this.state.allowComment? true: false}
                            onChange={this.handleChange}
                        /> True
                        <input type="radio" name="notAllowComment" 
                            checked={!this.state.allowComment? true: false}
                            onChange={this.handleChange}
                        /> False
                    </div>
                    <div className="f-field">
                        <label htmlFor="status">Status:</label>
                        <select name="status" value={this.state.status} onChange={this.handleChange} className="f-input">
                            <option value="">Select One</option>
                            <option value="public" selected>PUBLIC</option>
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
                        <input type="button" value="Delete" className="secondary" onClick={this.handleDelete} />
                        <input type="button" value="Discard Changes" className="danger" onClick={this.handleDiscard} />
                        <input type="submit" className="primary" value="Save Changes" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditBook;