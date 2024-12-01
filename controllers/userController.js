const User = require('../models/User'); // Assurez-vous que le chemin est correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // Assurez-vous d'importer Op pour les requêtes

// Fonction pour obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs" });
    }
};

// Fonction pour obtenir un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
    }
};

// Fonction pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { username } });
        const existingEmail = await User.findOne({ where: { email } }); // Vérification de l'email
        if (existingUser) {
            return res.status(400).json({ message: "Nom d'utilisateur déjà pris" });
        }
        if (existingEmail) {
            return res.status(400).json({ message: "Email déjà utilisé" });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email // Inclure l'email ici
        });

        res.status(201).json({ message: "Utilisateur créé avec succès", userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
    }
};

// Fonction pour se connecter
exports.login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body; // Changer le nom du champ

        // Trouver l'utilisateur par username ou email
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { username: usernameOrEmail },
                    { email: usernameOrEmail }
                ]
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvé" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion", error: error.message });
    }
};

// Fonction pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            return res.json(updatedUser);
        }
        throw new Error('Utilisateur non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Fonction pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            return res.status(204).send("Utilisateur supprimé");
        }
        throw new Error('Utilisateur non trouvé');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};