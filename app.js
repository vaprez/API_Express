// Importer le module Express
const express = require('express');

// Importer le module cors
const cors = require('cors');

// Importer le module dotenv
require('dotenv').config();

// Créer une application Express
const app = express();

// Définir une route racine
app.get('/', (req, res) => {
  res.send('Bonjour, monde !');
});

// Définir le port sur lequel le serveur va écouter
const PORT = process.env.PORT || 3000;

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

//pour eviter les erreur cors lors de reqûete effectuer depuis le front
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

const userRoutes = require('./src/routes/userRoutes')
const securePageRoutes = require('./src/routes/secure-page-Routes')
const produitRoutes = require('./src/routes/produitRoutes')
const categorieRoutes = require('./src/routes/categorieRoutes')
const panierRoutes = require('./src/routes/panierRoutes')

app.use('/api/secure-page', securePageRoutes)
app.use('/api/user', userRoutes)
app.use('/api/produit', produitRoutes)
app.use('/api/categorie', categorieRoutes)
app.use('/api/panier', panierRoutes)


