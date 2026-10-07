import { useNavigate } from 'react-router'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useFavorites } from '../hooks/useFavorites'
import { useAuth } from '../contexts/AuthContext'

function getCoverUrl(isbn) {
    if (!isbn) return null
    if (isbn.startsWith('978') || isbn.startsWith('979'))
	return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
  return `https://covers.openlibrary.org/b/id/${isbn}-M.jpg`
}

function BookCard({ title, author, genre, rating, isbn, id }) {
    const coverUrl = getCoverUrl(isbn)
    const { user } = useAuth()
    const { isFav, toggleFav } = useFavorites()
    const navigate = useNavigate()

    return (
	<div className="book-card" onClick={() => navigate(`/livre/${id}`)} style={{ cursor: 'pointer' }}>
	    <div className="book-cover">
		{coverUrl
		 ? <img src={coverUrl} alt={title} />
		 : <span className="book-cover-placeholder">📚</span>
		}
	    </div>
	    <div className="book-info">
		<h3>{title}</h3>
		<p className="book-author">{author}</p>
		<p className="book-genre">{genre}</p>
		<p className="book-rating">{'⭐'.repeat(rating)}</p>
		{user && (
		  <button className="book-fav-btn" onClick={e => { e.stopPropagation(); toggleFav(id) }}>
		    {isFav(id)
		      ? <><MdFavorite /> Retirer</>
		      : <><MdFavoriteBorder /> Favoris</>
		    }
		  </button>
		)}
	    </div>
	</div>
    )
}

export default BookCard
