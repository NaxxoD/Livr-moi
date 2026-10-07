import BookCard from './BookCard'

function BookRow({ books }) {
  return (
    <div className="book-row">
      {books.map(book => (
        <BookCard key={book.id} {...book} />
      ))}
    </div>
  )
}

export default BookRow
