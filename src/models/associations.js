const Project = require('./projects.model')
const User = require('./users.model')
const ProjectUser = require('./ProjectUsers')

// relación muchos a muchos Projects -> Users
Project.belongsToMany(User, { through: ProjectUser })
User.belongsToMany(Project, { through: ProjectUser })

// relación uno a muchos UserManager -> Projects
User.hasMany(Project, { foreignKey: 'project_manager_id' })
Project.belongsTo(User, { foreignKey: 'project_manager_id' })