import { useNavigate } from 'react-router'
import './NotFound.css'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="not-found-card">
        <h1>404</h1>
        <h2>Fonctionnalité en cours de développement</h2>
        <p>Cette page n'est pas encore disponible, revenez bientôt !</p>
        <button className="not-found-btn" onClick={() => navigate('/home')}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  )
}

export default NotFound
