import React from 'react'

class Book extends React.Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                {this.props.imageLinks && this.props.imageLinks.thumbnail &&
                    <div className="book-cover" style={{ width: 200, height: 200, backgroundImage: `url(${this.props.imageLinks.thumbnail})` }}></div>
                }
                <div className="book-shelf-changer">
                    <select>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" onClick={() => this.props.updateBook(this.props.id, 'currentlyReading')}>Currently Reading</option>
                    <option value="wantToRead" onClick={() => this.props.updateBook(this.props.id, 'wantToRead')}>Want to Read</option>
                    <option value="read" onClick={() => this.props.updateBook(this.props.id, 'read')}>Read</option>
                    <option value="none" onClick={() => this.props.updateBook(this.props.id, 'none')}>None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        )
    }
}

export default Book
