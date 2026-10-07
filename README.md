# Livr&Moi

Catalogue de livres avec comptes utilisateurs et favoris.

Projet académique réalisé en duo, 2025/2026. Conception et développement : [NaxxoD](https://github.com/NaxxoD) et Sarah.

## Stack

- **Front** : React 19, Vite, React Router
- **API** : Python, Flask (authentification par session, favoris), SQLite

## Lancement

### API

```bash
pip install flask flask-cors
export SECRET_KEY="<valeur-longue-aleatoire>"   # Windows : set SECRET_KEY=...
flask --app api init-db
flask --app api run --port 5000
```

Sans `SECRET_KEY`, une clé aléatoire est générée à chaque démarrage : les sessions sont alors invalidées au redémarrage.

### Front

```bash
npm install
npm run dev
```

Le front tourne sur `http://localhost:5173` et appelle l'API sur `http://localhost:5000`.

## Structure

- `api/` : application Flask, schéma SQL (`schema.sql`), routes d'authentification et de favoris
- `src/` : application React (pages, composants, contextes)
- `src/data.js` : catalogue de démonstration

## Licence

Aucune licence : tous droits réservés.
