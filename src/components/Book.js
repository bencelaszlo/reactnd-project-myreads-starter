import React from 'react'

class Book extends React.Component {
    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: this.props.cover.width, height: this.props.cover.height, backgroundImage: this.props.cover.backgroundImage }}></div>
                <div className="book-shelf-changer">
                    <select>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
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
