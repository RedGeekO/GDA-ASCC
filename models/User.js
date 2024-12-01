

const { DataTypes } = require('sequelize');
const sequelize = require('../config/BDD'); // Assurez-vous que le chemin est correct

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validation pour s'assurer que l'email est au bon format
    },
  },
  role: {
    type: DataTypes.ENUM('admin', 'member'), // Rôles possibles
    allowNull: false,
    defaultValue: 'member', // Valeur par défaut pour le rôle
  },
});

// Exporter le modèle User
module.exports = User;