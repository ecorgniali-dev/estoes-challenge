const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database/db.connection')

class Project extends Model { }
Project.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('disabled', 'enabled'),
        defaultValue: 'disabled'
    }
}, { 
    sequelize, 
    modelName: 'projects',
    timestamps: false
})

module.exports = Project
