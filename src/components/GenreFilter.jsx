import './GenreFilter.css'

function GenreFilter({ genres, selected, onSelect }) {
    return (
      <div className="genre-filter">
	{genres.map((genre, id) => (
          <button
            key={id}
          onClick={() => onSelect(genre)}
            className={selected === genre ? "active" : ""}
        >
            {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
