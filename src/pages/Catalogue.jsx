import { useState } from 'react'
import { useSearchParams } from 'react-router'
import NavBar from '../components/NavBar'
import UserBar from '../components/UserBar'
import BookCard from '../components/BookCard'
import GenreFilter from '../components/GenreFilter'
import books from '../data'
import './Catalogue.css'

const genres = ["Tous", "Roman", "Fantasy", "Science-Fiction", "Manga", "Théâtre", "Policier", "Poésie", "Littérature d'idées"]

function Catalogue() {
  const [searchParams] = useSearchParams()
  const genreParam = searchParams.get("genre") || "Tous"
  const [selected, setSelected] = useState(genreParam)
  const [sort, setSort] = useState("default")
  const search = searchParams.get("search") || ""

  const filteredBooks = books
    .filter(book => selected === "Tous" || book.genre === selected)
    .filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title)
      if (sort === "rating") return b.rating - a.rating
      return 0
    })

  return (
    <div className="catalogue">
      <NavBar />
      <div className="catalogue-body">
        <main className="catalogue-main">
          <h1>Catalogue</h1>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <GenreFilter genres={genres} selected={selected} onSelect={setSelected} />
            <select
              className="catalogue-sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="default">Trier par...</option>
              <option value="title">Titre A-Z</option>
              <option value="rating">Meilleures notes</option>
            </select>
          </div>
          <div className="books-grid">
            {filteredBooks.length === 0
              ? <p className="no-results">Aucun livre trouvé...</p>
              : filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  rating={book.rating}
                  isbn={book.isbn}
                />
              ))
            }
          </div>
        </main>
        <UserBar />
      </div>
    </div>
  )
}

export default Catalogue
