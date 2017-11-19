import React from 'react'

import './App.css'

const Book = ({ book, update}) => {
  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
        </div>
        <BookShelfChanger book={book} update={update}/>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors ? book.authors[0] : ''}</div>
    </div>
  )
}

const BookShelfChanger = ({ book, update}) => {
  const onAshelf = book.shelf
  return(
    <div className="book-shelf-changer">
      <select value={onAshelf ? book.shelf : "none"} onChange={(e) => e.target.value && update(book, e.target.value) }>
        <option value="none" disabled>Move to...</option>
        <option value="currentlyReading" >Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default Book
