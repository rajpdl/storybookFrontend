import React, { Component } from "react";
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
  }
  async componentDidMount() {
    const books = await fetch(`${BOOK}/public`);
    if (books.status === 200) {
      const data = await books.json();
      this.setState({ books: data }, () => {
        this.setState({ loading: false });
      });
    }
    
    if (books.status === 500) {
      this.setState({ msg: "Internal Server error occurred." });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <div>
        <Navigation />
        <div className="row">
            {this.state.books.length> 0 ?
                this.state.books.map((book, i) => {
                    return (
                      <Book
                        key={i}
                        _id={book._id}
                        title={book.title}
                        detail={book.detail}
                        author={book._creator.username}
                      />
                    );
                  })
        :
        <div className="message">
            <p>There is no public stories.</p>
            </div>
        
        }
          
        </div>
      </div>
    );
  }
}
export default Home;
