import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { BOOK } from "../../config/UrlConfig";
import Book from "../../component/Book";
import Loading from "../../component/Loading";
import Navigation from "../../component/Navigation";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      books: [],
      msg: "",
    };
    this.handleCreate = this.handleCreate.bind(this);
  }
  async componentDidMount() {
    const result = await fetch(`${BOOK}/`, {
      headers: {
        "x-auth": localStorage.getItem("authToken"),
      },
    });
    if (result.status === 200) {
      const data = await result.json();
      this.setState({ books: data }, () => {
        this.setState({ loading: false });
      });
    }
    if(result.status === 401) {
      this.props.history.push('/login');
  }
    if (result.status === 500) {
      this.setState({ msg: "Internal Server error occurred." });
    }
  }

  handleCreate() {
    this.props.history.push("/create");
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        {this.state.books.length ? (
          <div>
            <Navigation />
            <button className="primary create" onClick={this.handleCreate}>
              Create One
            </button>
            <div className="row">
              {this.state.books.map((book, i) => {
                return (
                  <Book
                    key={i}
                    _id={book._id}
                    title={book.title}
                    detail={book.detail}
                    editAble={true}
                    author={book._creator.username}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <Navigation />
            <div className="row">
              <div className="message">
                <p>There is no private stories.</p>
              </div>
              
              <button className="primary" onClick={this.handleCreate}>
                Create One
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Home);
