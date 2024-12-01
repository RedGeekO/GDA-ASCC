const { DataTypes } = require('sequelize');
const sequelize = require('../config/BDD');


const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nom du modèle d'utilisateur
        key: 'id',
      },
    },
  }, {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  });
  
  module.exports = Message;