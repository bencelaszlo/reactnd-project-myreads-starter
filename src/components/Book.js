import React from 'react'

const Book = ({ id, imageLinks, shelf, title, authors, updateBook }) => {
    const changeShelf = (shelf) => {
        updateBook(id, shelf);
    };

   return (
        <div className="book">
            <div className="book-top">
            {imageLinks && imageLinks.thumbnail &&
                <div className="book-cover" style={{ width: 200, height: 200, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
            }
            <div className="book-shelf-changer">
                <select value={shelf ? shelf : "none"} onChange={event => changeShelf(event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
        </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(', ')}</div>
        </div>
   );
}

export default Book;
