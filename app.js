

require('dotenv').config(); // Charge les variables d'environnement depuis .env

const express = require('express');
const app = express();

// Utilisation des variables d'environnement
const port = process.env.PORT || 3000; // Utiliser PORT défini dans .env ou 3000 par défaut

// Middleware pour parser le JSON
app.use(express.json());

// Importation de la configuration de la base de données
const sequelize = require('./config/BDD');

// Importation des modèles
const User = require('./models/User');
const Document = require('./models/Document');

// Définition des associations entre les modèles
User.hasMany(Document, { foreignKey: 'createdBy' });
Document.belongsTo(User, { foreignKey: 'createdBy' });

// Synchronisation de la base de données
sequelize.sync({ force: false, alter: true }).then(() => {
  console.log("Base de données synchronisée");
}).catch(err => {
  console.error("Erreur lors de la synchronisation :", err);
});

// Routes
const documentRoutes = require('./routes/documentRoutes'); // Importer les routes des documents
const userRoutes = require('./routes/userRoutes'); // Importer les routes des utilisateurs
const reminderRoutes = require('./routes/reminderRoutes'); // Importer les routes des rappels
const messagesRoutes = require('./routes/messageRoutes'); // Importer les routes des messages

// Utilisation des routes
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', userRoutes);

// Route principale
app.get('/', (req, res) => {
    res.send('Gestion de Documents Administratifs');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});