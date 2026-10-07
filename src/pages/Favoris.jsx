import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import NavBar from '../components/NavBar'
import UserBar from '../components/UserBar'
import BookCard from '../components/BookCard'
import { useAuth } from '../contexts/AuthContext'
import { useFavorites } from '../hooks/useFavorites'
import books from '../data'
import './Favoris.css'

function Favoris() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) navigate('/connexion')
  }, [user])

  const favBooks = books.filter(b => favorites.includes(b.id))

  if (user === undefined) return null

  return (
    <div className="favoris">
      <NavBar />
      <div className="favoris-body">
        <main className="favoris-main">
          <h1>Mes Favoris</h1>
          {favBooks.length === 0
            ? (
              <div className="favoris-empty">
                <p>Vous n'avez pas encore de favoris.</p>
                <button onClick={() => navigate('/catalogue')}>
                  Parcourir le catalogue
                </button>
              </div>
            )
            : (
              <div className="books-grid">
                {favBooks.map(book => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            )
          }
        </main>
        <UserBar />
      </div>
    </div>
  )
}

export default Favoris
