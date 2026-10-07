import { useState, useEffect } from 'react'
import { api } from '../api'
import { useAuth } from '../contexts/AuthContext'

export function useFavorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (!user) { setFavorites([]); return }
    api.get('/favoris/')
      .then(setFavorites)
      .catch(() => setFavorites([]))
  }, [user])

  function isFav(bookId) {
    return favorites.includes(bookId)
  }

  async function toggleFav(bookId) {
    if (isFav(bookId)) {
      await api.delete(`/favoris/${bookId}`)
      setFavorites(prev => prev.filter(id => id !== bookId))
    } else {
      await api.post('/favoris/', { book_id: bookId })
      setFavorites(prev => [...prev, bookId])
    }
  }

  return { favorites, isFav, toggleFav }
}
