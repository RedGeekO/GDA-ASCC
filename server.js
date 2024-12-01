const app = require('./app'); // Importer l'application Express définie dans app.js
const port = process.env.PORT || 3000; // Définir le port d'écoute

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});