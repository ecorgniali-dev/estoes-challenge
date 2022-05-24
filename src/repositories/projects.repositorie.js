const Project = require('../models/projects.model')
const User = require('../models/users.model')
const { Op } = require('sequelize')

const getAll = async (offset, limit, query) => {
    const countAndRows = await Project.findAndCountAll({
        order: [['id', 'DESC']],
        offset,
        limit,
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName'],
                through: {
                    attributes: []
                }
            }
        ]
    })
    return countAndRows
}

const getById = async (projectId) => {
    const project = await Project.findByPk(
        projectId,
        {
            include: [
                {
                    model: User,
                    attributes: ['firstName', 'lastName'],
                    through: {
                        attributes: []
                    }
                }
            ]
        }
    )
    return project
}

const create = async (project) => {
    const newProject = await Project.create(project, { include: [User] })
    if (project.users_id.length) {
        await newProject.addUsers(project.users_id)
    }
    return newProject
}

const update = async (project, newData) => {
    const projectUpdated = await project.update(project, newData)
    projectUpdated.setUser(newData.project_manager_id) // update project manager
    projectUpdated.setUsers(newData.users_id) // update assigned users
    return projectUpdated
}

const remove = async (id) => {
    const data = await Project.destroy({ where: { id } })
    return data
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}