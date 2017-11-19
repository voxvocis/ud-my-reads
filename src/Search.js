import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import './App.css'


class Search extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    res: PropTypes.array.isRequired,
    update: PropTypes.func.isRequired,
  }

  state = {
    query: ''
  }

  searchQuery = (query) => {
    const trimQuery = query.trim()
    if (trimQuery) {
      this.setState(
        { query: query.trim() },
        () => this.props.search(this.state.query)
      )
    } else {
      this.setState({ query: query.trim() })
    }
  }

  render() {
    const { res, update, clear } = this.props
    const { query } = this.state
    return (
      <div className="search-books">
        <SearchBooksBar search={this.searchQuery} query={query} clear={clear} />
        <div className="search-books-results">
          <ol className="books-grid">
            {res.map(book => (
              <li key={book.id}>
                <Book book={book} update={update} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

const SearchBooksBar = ({ search, query, clear }) => (
  <Route render={({ history}) => (
    <div className="search-books-bar">
      <a className="close-search" onClick={() => {
        clear()
        history.push('/')
      }}>Close</a>
      <div className="search-books-input-wrapper">
        <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={(event) => search(event.target.value)}
        />

      </div>
    </div>
  )} />
)

export default Search
