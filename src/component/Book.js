import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props._id,
    };
    this.handleDetail = this.handleDetail.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleDetail() {
    this.props.history.push(`/detail/${this.state.id}`, {
      id: this.state.id,
    });
  }
  handleEdit() {
      this.props.history.push(`/edit/${this.state.id}`, {
          id: this.state.id
      });
  }

  render() {
    return (
      <div className="col-6">
        <h1 className="w-t">
          {this.props.title}
        </h1>
        <p>
          <b>{this.props.detail}</b>
        </p>
        <p>Author: {this.props.author}</p>
        <p className="read-more detail" onClick={this.handleDetail}>Read More</p>
        {this.props.editAble ? (
          <button onClick={this.handleEdit} className="edit detail">
            Edit
          </button>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Book);
