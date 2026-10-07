import { NavLink, useNavigate } from 'react-router'
import {
  MdHome, MdFavorite, MdBookmark, MdPerson,
  MdChat, MdNotifications, MdGroup,
  MdSettings, MdLogout, MdLogin,
} from 'react-icons/md'
import { useAuth } from '../contexts/AuthContext'
import './UserBar.css'

const navItems = [
  { to: '/home',       Icon: MdHome,         label: 'Accueil' },
  { to: '/favoris',    Icon: MdFavorite,      label: 'Favoris' },
  { to: '/a-voir',     Icon: MdBookmark,      label: 'À voir' },
  { to: '/profil',     Icon: MdPerson,        label: 'Profil' },
  { to: '/chat',       Icon: MdChat,          label: 'Chat' },
  { to: '/notifs',     Icon: MdNotifications, label: 'Notifications' },
  { to: '/communaute', Icon: MdGroup,         label: 'Communauté' },
]

function UserBar() {
  const { user, deconnexion } = useAuth()
  const navigate = useNavigate()

  const initial = user?.email?.[0].toUpperCase() ?? '?'

  async function handleDeconnexion() {
    await deconnexion()
    navigate('/connexion')
  }

  return (
    <aside className="userbar">
      <nav className="userbar-nav">
        {navItems.map(({ to, Icon, label }) => (
          <NavLink key={to} to={to} className="userbar-item">
            <Icon className="userbar-icon" />
            <span className="userbar-label">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="userbar-bottom">
        <div className="userbar-item">
          <MdSettings className="userbar-icon" />
          <span className="userbar-label">Paramètres</span>
        </div>
        <div className="userbar-avatar" title={user?.email ?? 'Non connecté'}>
          {initial}
        </div>
        {user
          ? (
            <div className="userbar-item" onClick={handleDeconnexion}>
              <MdLogout className="userbar-icon" />
              <span className="userbar-label">Déconnexion</span>
            </div>
          ) : (
            <NavLink to="/connexion" className="userbar-item">
              <MdLogin className="userbar-icon" />
              <span className="userbar-label">Connexion</span>
            </NavLink>
          )
        }
      </div>
    </aside>
  )
}

export default UserBar
