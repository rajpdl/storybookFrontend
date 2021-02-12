import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import Comment from "../../component/Comment";
import Loading from "../../component/Loading";
import Navigation from "../../component/Navigation";
import { BOOK } from "../../config/UrlConfig";

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: this.props.location.state.id,
      msg: "",
      book: {},
      comment: '',
      comments: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleComment = this.handleComment.bind(this);
  }
  async componentDidMount() {
    this.initDetail();
  }

  async initDetail() {
    const result = await fetch(`${BOOK}/public/${this.state.id}`, {
      method: "GET",
    });
    if (result.status === 200) {
      const data = await result.json();
      this.setState({ book: data }, () => {
        this.setState({ comments: data.comments });
        this.setState({ loading: false });
      });
    }
    if (result.status === 404) {
      this.setState({ msg: "Not found." }, () => {
        this.setState({ loading: false });
      });
    }
  }
  handleChange(e) {
      const name = e.target.name,
        value=e.target.value;
    this.setState({[name]: value});
  }
  async handleComment(e) {
    e.preventDefault();
    if(!this.state.comment || this.state.comment.length < 4) {
        return alert('Please fill out the box with at least 4 characters.');
    }
    const result = await fetch(`${BOOK}/comment/${this.state.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': localStorage.getItem('authToken')
        },
        body: JSON.stringify({comment: this.state.comment})
    });
    if(result.status === 200) {
      this.initDetail();
      this.setState({comment: ''});
    }
    if(result.status === 400) {
        this.setState({msg: "Please fill the comment box."});
    }
    if(result.status === 401) {
        this.props.history.push('/login');
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <Navigation />
        <div className="detail-card">
          {this.state.msg ? (
            <div className="message">
              <p>{this.state.msg}</p>
            </div>
          ) : (
            <div>
              <h1>{this.state.book.title}</h1>

              <p>{this.state.book.detail}</p>

              <p>Writer : {this.state.book._creator.username}</p>
              {!this.state.book.allowComment ? (
                <div className="message">
                  <p>Comment is not allow for this story.</p>
                </div>
              ) : (
                <div>
                  {!localStorage.getItem("authToken") ? (
                    <div className="message">
                      <p className="c-message">
                        Please <Link to="/login">log in </Link> to make comment.
                      </p>
                    </div>
                  ) : (
                    <div className="form">
                        
                      <form onSubmit={this.handleComment}>
                        <div className="f-field">
                          <label htmlFor="comment">Comments</label>
                          <textarea
                            placeholder="Please write the comment here..."
                            className="f-input"
                            name="comment"
                            rows="8"
                            value={this.state.comment}
                            onChange={this.handleChange}
                          ></textarea>
                        </div>
                        <input type="submit" value="Commet" className="secondary"/>
                      </form>
                    </div>
                  )}

                  <div className="comments">
                    {this.state.comments.length > 0
                      ? this.state.comments.map((comment, i) => {
                          return (
                            <Comment
                              comment={comment.comment}
                              key={i}
                              username={comment._commenter.username}
                            />
                          );
                        })
                      : null}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Detail);
