import { NavLink, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import './NavBar.css'

function NavBar() {
  const [search, setSearch] = useState("")
  const [dark, setDark] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  function handleSearch(e) {
    const value = e.target.value
    setSearch(value)
    navigate(`/catalogue?search=${value}`)
  }

  function toggleTheme() {
    setDark(!dark)
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <NavLink to="/home">Accueil</NavLink>
        <NavLink to="/catalogue">Catalogue</NavLink>
        <NavLink to="/favoris">Favoris</NavLink>
      </div>
      <h1 className="navbar-title">Livr'émoi</h1>
      <div className="navbar-right">
        <input
          className="navbar-search"
          type="text"
          placeholder="Rechercher un livre..."
          value={search}
          onChange={handleSearch}
        />
        <button className="theme-toggle" onClick={toggleTheme}>
          {dark ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>
    </nav>
  )
}

export default NavBar
