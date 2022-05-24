const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/db.connection');

class User extends Model { }
User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { 
    sequelize, 
    modelName: 'users',
    timestamps: false
});

module.exports = User;
