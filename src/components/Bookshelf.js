import React from 'react'
import Book from './Book'

class Bookshelf extends React.Component {
    render () {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {Array.isArray(this.props.books) && this.props.books.map((book, i) => {
                            return (<Book key={i} updateBook={this.props.updateBook} {...book}/>)
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Bookshelf
