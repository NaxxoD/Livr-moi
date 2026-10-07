import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useAuth } from '../contexts/AuthContext'
import { useFavorites } from '../hooks/useFavorites'
import { useNavigate } from 'react-router'
import NavBar from '../components/NavBar'
import BookRow from '../components/BookRow'
import UserBar from '../components/UserBar'
import books from '../data'
import './Home.css'

const featured = books.find(b => b.title === "Le Seigneur des Anneaux")
const suites = books.filter(b =>
    b.series && b.series === featured.series && b.id !== featured.id
).slice(0, 3)
const otherWorks = books.filter(b =>
    b.author === featured.author && b.id !== featured.id && b.series !== featured.series
).slice(0, 3)
const trending = [...books].sort(() => Math.random() - 0.5).slice(0, 8)
const topRated = [...books].sort((a, b) => b.rating - a.rating).slice(0, 8)
const genres = ['Roman', 'Fantasy', 'Science-Fiction', 'Manga', 'Théâtre', 'Policier', 'Poésie', "Littérature d'idées"]

function RelatedBook({ book }) {
    const src = book.isbn?.startsWith('978') || book.isbn?.startsWith('979')
	  ? `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
	  : `https://covers.openlibrary.org/b/id/${book.isbn}-M.jpg`
    return (
	<div className="related-item">
	    <img src={src} alt={book.title} />
	    <span>{book.title}</span>
	</div>
    )
}

function Home() {
    const { user } = useAuth()
    const { isFav, toggleFav } = useFavorites()
    const navigate = useNavigate()
    
    return (
    <div className="home">
	<NavBar />
	<div className="home-body">
            <aside className="sidebar">
		<div>
		    <h3>Recherche par catégorie</h3>
		    <div className="sidebar-genres">
			{genres.map(g => (
			    <button key={g} onClick={() => navigate(`/catalogue?genre=${encodeURIComponent(g)}`)}>
				{g}
			    </button>
			))}
		    </div>
		</div>
		<div className="sidebar-communication">
		    <h3>Communication</h3>
		    <p>Espace d'échange de la communauté.</p>
			</div>
			</aside>
			<main className="home-main">
			    <section className="featured">
				<div className="featured-top">
				    <div className="featured-left">
					<h2>À la une</h2>
					<div className="featured-cover">
					    <img
						src={`https://covers.openlibrary.org/b/isbn/${featured.isbn}-M.jpg`}
						alt={featured.title}
					    />
					</div>
				    </div>
				    <div className="featured-info">
					<h3>{featured.title}</h3>
					<p className="featured-author">{featured.author}</p>
					<span className="featured-tag">{featured.genre}</span>
					<p className="featured-resume">
					    Un chef-d'œuvre intemporel qui a marqué des générations de lecteurs.
					    Une histoire captivante qui mêle aventure, émotions et réflexions profondes
					    sur la condition humaine.
					</p>
					<p className="featured-rating">{'⭐'.repeat(featured.rating)}</p>
					<div className="featured-buttons">
					    <button className="featured-btn">Voir</button>
					    {user && (
						<button
						    className="featured-btn featured-fav-btn"
						    onClick={() => toggleFav(featured.id)}
						>
						    {isFav(featured.id)
						      ? <><MdFavorite /> Retirer</>
						      : <><MdFavoriteBorder /> Favoris</>
						    }
						</button>
					    )}
					</div>
				    </div>
				</div>
				{(suites.length > 0 || otherWorks.length > 0) && (
				    <div className="featured-related">
					{suites.length > 0 && (
					    <div className="related-group">
						<h4>Tomes suivants</h4>
						<div className="related-row">
						    {suites.map(book => (
							<RelatedBook key={book.id} book={book} />
						    ))}
						</div>
					    </div>
					)}
					{suites.length > 0 && otherWorks.length > 0 && (
					    <div className="related-divider" />
					)}
					{otherWorks.length > 0 && (
					    <div className="related-group">
						<h4>Du même auteur</h4>
						<div className="related-row">
						    {otherWorks.map(book => (
							<RelatedBook key={book.id} book={book} />
						    ))}
						</div>
					    </div>
					)}
				    </div>
				)}
			    </section>
			    <section className="book-section">
				<h2>Tendances actuelles</h2>
				<BookRow books={trending} />
			    </section>
			    <section className="book-section">
				<h2>Meilleures Notes</h2>
				<BookRow books={topRated} />
			    </section>
			</main>
	<UserBar />
	</div>
	</div>
    )
}

export default Home
