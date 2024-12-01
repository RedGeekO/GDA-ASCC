const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importer le contrôleur

// Route pour obtenir tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour obtenir un utilisateur par ID
router.get('/:id', userController.getUserById);

// Route pour créer un nouvel utilisateur (inscription)
router.post('/register', userController.createUser);

// Route pour se connecter (authentification)
router.post('/login', userController.login); // Ajout de la route de connexion

// Route pour mettre à jour un utilisateur
router.put('/:id', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;