import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined) // undefined = chargement en cours

  useEffect(() => {
    api.get('/auth/me')
      .then(setUser)
      .catch(() => setUser(null))
  }, [])

  async function inscription(email, password) {
    const u = await api.post('/auth/inscription', { email, password })
    setUser(u)
    return u
  }

  async function connexion(email, password) {
    const u = await api.post('/auth/connexion', { email, password })
    setUser(u)
    return u
  }

  async function deconnexion() {
    await api.post('/auth/deconnexion')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, inscription, connexion, deconnexion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
