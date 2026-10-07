import { useParams, useNavigate } from 'react-router'
import { MdFavorite, MdFavoriteBorder, MdArrowBack } from 'react-icons/md'
import NavBar from '../components/NavBar'
import UserBar from '../components/UserBar'
import { useAuth } from '../contexts/AuthContext'
import { useFavorites } from '../hooks/useFavorites'
import books from '../data'
import './BookDetail.css'

function getCoverUrl(isbn) {
  if (!isbn) return null
  if (isbn.startsWith('978') || isbn.startsWith('979'))
    return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
  return `https://covers.openlibrary.org/b/id/${isbn}-L.jpg`
}

function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isFav, toggleFav } = useFavorites()

  const book = books.find(b => b.id === parseInt(id))

  if (!book) {
    navigate('/404')
    return null
  }

  const coverUrl = getCoverUrl(book.isbn)

  const seriesTomes = book.series
    ? books
        .filter(b => b.series === book.series && b.id !== book.id)
        .sort((a, b) => a.volume - b.volume)
    : []

  return (
    <div className="book-detail">
      <NavBar />
      <div className="book-detail-body">
        <main className="book-detail-main">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <MdArrowBack /> Retour
          </button>

          <div className="book-detail-content">
            <div className="book-detail-cover">
              {coverUrl
                ? <img src={coverUrl} alt={book.title} />
                : <div className="book-detail-placeholder">📚</div>
              }
            </div>

            <div className="book-detail-info">
              <span className="book-detail-genre">{book.genre}</span>
              <h1>{book.title}</h1>
              <p className="book-detail-author">{book.author}</p>
              <p className="book-detail-rating">{'⭐'.repeat(book.rating)}</p>

              {book.description && (
                <p className="book-detail-description">{book.description}</p>
              )}

              {user && (
                <button
                  className="book-detail-fav-btn"
                  onClick={() => toggleFav(book.id)}
                >
                  {isFav(book.id)
                    ? <><MdFavorite /> Retirer des favoris</>
                    : <><MdFavoriteBorder /> Ajouter aux favoris</>
                  }
                </button>
              )}
            </div>
          </div>

          {seriesTomes.length > 0 && (
            <section className="book-detail-series">
              <h2>Autres tomes de la série</h2>
              <div className="book-detail-series-grid">
                {seriesTomes.map(tome => {
                  const tomeUrl = getCoverUrl(tome.isbn)
                  return (
                    <div
                      key={tome.id}
                      className="series-tome"
                      onClick={() => navigate(`/livre/${tome.id}`)}
                    >
                      {tomeUrl
                        ? <img src={tomeUrl} alt={tome.title} />
                        : <div className="series-tome-placeholder">📚</div>
                      }
                      <span>{tome.title}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}
        </main>
        <UserBar />
      </div>
    </div>
  )
}

export default BookDetail
