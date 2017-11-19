import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksApi from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
import update from 'immutability-helper';

import './App.css'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchedBooks: [],
  }

  componentDidMount() {
    this.getAll()
  }

  getAll = () => {
    BooksApi.getAll().then(books => {
      this.setState({
        currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
        wantToRead: books.filter(book => book.shelf === 'wantToRead'),
        read: books.filter(book => book.shelf === 'read'),
      })
      books.forEach(book => book.shelf && this.updateSearchedBooks(book))
    })
  }

  updateSearchedBooks = book => {
    const searchedBooks = this.state.searchedBooks
    let index = searchedBooks.findIndex( c => {
        return c.id === book.id;
    })
    if (index !== -1) {
      const updatedSearchedBook = update(searchedBooks[index], {shelf: {$set: book.shelf}});
      var newData = update(searchedBooks, {
          $splice: [[index, 1, updatedSearchedBook]]
      });
      this.setState({searchedBooks: newData});
    }
  }

  searchBooks = searchTerm => {
    BooksApi.search(searchTerm, 20).then(books => {
      if (books instanceof Array) {
        this.setState({
          searchedBooks: books,
        }, this.getAll)
      } else {
        this.setState({
          searchedBooks: [],
        })
      }
    })
  }

  clearSearchedBooks = () => {
    this.setState({
      searchedBooks: [],
    })
  }

  update = (book, shelf) => {
    BooksApi.update(book, shelf).then(res => {
      this.getAll()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Shelf books={this.state.currentlyReading} update={this.update} title={'Currently Reading'} />
                <Shelf books={this.state.wantToRead} update={this.update} title={'Want to Read'} />
                <Shelf books={this.state.read} update={this.update} title={'Read'} />
              </div>
            </div>
            <Link
              className='open-search'
              to='/search'
            > <p>Add a book </p></Link>
          </div>
        )} />
        <Route exact path='/search' render={() => (
          <Search search={this.searchBooks} res={this.state.searchedBooks} update={this.update} clear={this.clearSearchedBooks}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
