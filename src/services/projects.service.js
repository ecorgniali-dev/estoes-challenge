const projectsRepositorie = require('../repositories/projects.repositorie')
const { paginate } = require('../modules/pagination')

const getAll = async (req) => {
    const resultPaginated = paginate(projectsRepositorie.getAll, req, 3)
    return resultPaginated
}

const getById = async (projectId) => {
    const project = await projectsRepositorie.getById(projectId)
    if (project === null) {
        const error = new Error(`Project with id ${projectId} does not exist`)
        error.status = 404
        throw error
    }
    return project
}

const create = async (data) => {
    const newProject = await projectsRepositorie.create(data)
    return newProject
}

const update = async (projectId, newData) => {
    const project = await projectsRepositorie.getById(projectId)
    if (project === null) {
        const error = new Error(`Project with id ${projectId} does not exist`)
        error.status = 404
        throw error
    }
    const projectUpdated = await projectsRepositorie.update(project, newData)
    return projectUpdated
}

const remove = async (projectId) => {
    const project = await projectsRepositorie.getById(projectId)
    if (project === null) {
        const error = new Error(`Project with id ${projectId} does not exist`)
        error.status = 404
        throw error
    }
    const data = await projectsRepositorie.remove(projectId)
    return data
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}