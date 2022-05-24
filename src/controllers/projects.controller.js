const projectsService = require('../services/projects.service')

const getAll = async (req, res, next) => {
    try {
        const projects = await projectsService.getAll(req)
        res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
}

const getById = async (req, res, next) => {
    try {
        const project = await projectsService.getById(req.params.id)
        res.status(200).json({
            data: project
        })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const newProject = await projectsService.create(req.body)
        res.status(201).json({
            msg: 'Project created successfully',
            data: newProject
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const projectUpdated = await projectsService.update(req.params.id, req.body)
        res.status(200).json({
            msg: 'Project updated successfully',
            data: projectUpdated
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const data = await projectsService.remove(req.params.id)
        res.status(200).json({
            msg: 'Project removed successfully',
            data: data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}