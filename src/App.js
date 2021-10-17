import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Bookshelf from './components/Bookshelf'
import './App.css'
import { getAll, update, search } from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.fetchBooks = this.fetchBooks.bind(this);
  }

  state = {
    books: [],
    shelfs: [
      { shelf: 'currentlyReading', title: 'Currently Reading' },
      { shelf: 'wantToRead', title: 'Want to Read' },
      { shelf: 'read', title: 'Read' }
    ],
    searchTerm: '',
    searchResultBooks: []
  }

  async fetchBooks() {
    const books = await getAll();
    this.setState({ books });
  }

  async componentDidMount() {
    await this.fetchBooks();
  }

  async updateBook(id, shelf) {
    try {
      await update({ id }, shelf);
      await this.fetchBooks();
    } catch (error) {
      console.error(error);
    }
  }

  updateQuery = (queryTerm) => {
    console.log('queryTerm', queryTerm)
    this.setState({ searchTerm: queryTerm });
    search(queryTerm).then(searchResultBooks => {
      this.setState({ searchResultBooks: this.getBooksOnShelves(searchResultBooks) });
    });
  }

  getBooksOnShelves = (searchResultBooks) => {
    if (!Array.isArray(searchResultBooks) || !Array.isArray(this.state.books)) {
      return [];
    }

    return searchResultBooks.reduce((prev, current) => {
      const bookOnAShelf = this.state.books.find(book => book.title === current.title);
      if (bookOnAShelf) {
        return [...prev, bookOnAShelf];
      }

      return [...prev, current];
    }, []);
  }

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/search">
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to="/">
                    <button className="close-search"></button>
                  </Link>
                  <div className="search-books-input-wrapper">
                    {/*
                      NOTES: The search from BooksAPI is limited to a particular set of search terms.
                      You can find these search terms here:
                      https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                      However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                      you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={e => this.updateQuery(e.target.value) }/>

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                    <Bookshelf
                      key="searchresults"
                      title="Search Results"
                      books={this.state.searchResultBooks}
                      updateBook={this.updateBook.bind(this)}
                    />
                  </ol>
                </div>
              </div>
            </Route>
            <Route path="/">
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    {this.state.shelfs.map(({ shelf, title }) => (
                      <Bookshelf
                        key={shelf}
                        title={title}
                        books={this.state.books.filter(book => book.shelf === shelf)}
                        updateBook={this.updateBook.bind(this)}
                      />
                    ))}
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">
                    <button>Search</button>
                  </Link>
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
