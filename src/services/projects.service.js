const projectsRepositorie = require('../repositories/projects.repositorie')
const usersRepositorie = require('../repositories/users.repositorie')
const { paginate } = require('../modules/pagination')

const getAll = async (req) => {
    if (req.query.name) return await projectsRepositorie.searchByName(req.query.name)
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
    await validationUserExist(data)
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
    await validationUserExist(newData)
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

async function validationUserExist(data) {
    const pmId = data.project_manager_id
    const userExist = await usersRepositorie.getById(pmId)
    if (userExist === null && pmId != undefined) {
        const error = new Error('The user you are trying to assign as project manager does not exist')
        error.status = 400
        throw error
    }
    for (let i = 0; i < data.users_id.length; i++) {
        const userId = data.users_id[i]
        const exist = await usersRepositorie.getById(userId)
        if (exist === null) {
            const error = new Error(`The user with id ${userId} you are trying to assign to the project does not exist`)
            error.status = 400
            throw error
        }
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}