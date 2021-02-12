import React, { Component } from "react";

class Comment extends Component {
  render() {
    return (
      <div className="c-card">
        <p>
          <b>{this.props.comment}</b>
        </p>
        <p> Comment By {this.props.username}</p>
      </div>
    );
  }
}

export default Comment;