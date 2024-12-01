const { DataTypes } = require('sequelize');
const sequelize = require('../config/BDD');

const Reminder = sequelize.define('Reminder', {
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    documentId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Documents', // Assurez-vous que le modèle Document existe
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

module.exports = Reminder;