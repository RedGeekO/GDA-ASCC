const { DataTypes } = require('sequelize');
const sequelize = require('../config/BDD');

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    timestamps: true,
});

module.exports = Role;