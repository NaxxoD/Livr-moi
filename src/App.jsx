import { Routes, Route } from 'react-router'
import Entry from './pages/Entry'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Favoris from './pages/Favoris'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'
import BookDetail from './pages/BookDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/"            element={<Entry />} />
      <Route path="/home"        element={<Home />} />
      <Route path="/catalogue"   element={<Catalogue />} />
      <Route path="/favoris"     element={<Favoris />} />
      <Route path="/connexion"   element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/livre/:id"   element={<BookDetail />} />
      <Route path="*"            element={<NotFound />} />
    </Routes>
  )
}

export default App
