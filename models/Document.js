const { DataTypes } = require('sequelize');
const sequelize = require('../config/BDD');

const Document = sequelize.define('Document', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  recipient: { // Champ pour le destinataire
    type: DataTypes.STRING,
  },
  createdBy: { // Champ pour l'ID de l'utilisateur qui a créé le document
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Nom du modèle d'utilisateur
      key: 'id',
    },
  },
}, {
  timestamps: true, // Cela ajoute automatiquement les champs createdAt et updatedAt
});

module.exports = Document;