import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import './Entry.css'

const CATEGORIES = [
  {
    label: 'Roman',
    query: 'subject:fiction',
    fallback: [
      '9780156013987', '9780679720201', '9780140449129',
      '9780451419439', '206536', '13580239',
    ],
  },
  {
    label: 'Fantasy',
    query: 'subject:fantasy',
    fallback: [
      '9780439708180', '9780618640157', '9780345339683',
      '9780553573404', '12641959', '9780064471190',
    ],
  },
  {
    label: 'Science-Fiction',
    query: 'subject:science+fiction',
    fallback: [
      '9780451524935', '9780441013593', '9780060850524',
      '9781451673319', '9780553293357', '9780425013427',
    ],
  },
  {
    label: 'Manga',
    query: 'manga+japanese+comics',
    fallback: [
      '9781569319000', '9781421501697', '9781591164418',
      '9781569319208', '9788483579329', '9788493607357',
    ],
  },
  {
    label: 'Théâtre',
    query: 'subject:drama+theater',
    fallback: [
      '9780743477123', '9780743477116', '9780802144423',
      '9780156036559', '9780140447323', '9780802130044',
    ],
  },
  {
    label: 'Policier',
    query: 'subject:mystery+detective',
    fallback: [
      '9780141040288', '9780062073563', '9780307474278',
      '9780140439069', '9780679723424', '9780140439144',
    ],
  },
  {
    label: 'Poésie',
    query: 'subject:poetry',
    fallback: [
      '9780140444445', '9780140443820', '9780374529178',
      '9780140586244', '9780812970067', '9780679723110',
    ],
  },
  {
    label: "Littérature d'idées",
    query: 'subject:essays+french+literature',
    fallback: [
      '9782070360611', '9782070369577', '9782070442300',
      '9782070413119', '9782070361175', '9780140449129',
    ],
  },
]

const MIN_COVERS = 22

function toUrl(ref) {
  if (ref.startsWith('http')) return ref
  if (ref.startsWith('978') || ref.startsWith('979'))
    return `https://covers.openlibrary.org/b/isbn/${ref}-M.jpg`
  return `https://covers.openlibrary.org/b/id/${ref}-M.jpg`
}

async function fetchCovers(category) {
  const offset = Math.floor(Math.random() * 50)
  try {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${category.query}&limit=30&offset=${offset}&fields=cover_i`
    )
    const data = await res.json()
    const covers = data.docs
      .filter(doc => doc.cover_i)
      .map(doc => `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`)

    const fallbackUrls = category.fallback.map(toUrl)
    const merged = [...covers, ...fallbackUrls]

    if (merged.length >= MIN_COVERS) return merged.slice(0, MIN_COVERS + 5)
    return Array.from({ length: MIN_COVERS }, (_, i) => merged[i % merged.length])
  } catch {
    const fallbackUrls = category.fallback.map(toUrl)
    return Array.from({ length: MIN_COVERS }, (_, i) => fallbackUrls[i % fallbackUrls.length])
  }
}

function Entry() {
  const navigate = useNavigate()
  const [rows, setRows] = useState(CATEGORIES.map(() => []))

  useEffect(() => {
    Promise.all(CATEGORIES.map(fetchCovers))
      .then(results => setRows(results))
  }, [])

  return (
    <div className="entry">
      <div className="entry-mosaic">
        {rows.map((covers, i) => (
          <div key={i} className="mosaic-row">
            {covers.map((url, j) => (
              <img key={j} src={url} alt="" />
            ))}
          </div>
        ))}
      </div>
      <div className="entry-overlay">
        <div className="entry-card">
          <h1>Livr'émoi</h1>
          <button className="entry-btn" onClick={() => navigate('/home')}>
            Entrée
          </button>
          <div className="entry-auth-links">
            <Link to="/connexion">Se connecter</Link>
            <span>·</span>
            <Link to="/inscription">S'inscrire</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Entry
