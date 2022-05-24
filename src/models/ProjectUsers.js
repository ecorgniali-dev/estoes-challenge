const { Model } = require('sequelize');
const sequelize = require('../database/db.connection');

class ProjectUser extends Model { }
ProjectUser.init({}, { 
    sequelize, 
    modelName: 'projects_has_users',
    timestamps: false
});

module.exports = ProjectUser;