const usersService = require('../services/users.service')

const getAll = async (req, res, next) => {
    try {
        const users = await usersService.getAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const newUser = await usersService.create(req.body)
        res.status(201).json({
            msg: 'User created successfully',
            data: newUser
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        const data = await usersService.remove(req.params.id)
        res.status(200).json({
            msg: 'User removed successfully',
            data: data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    create,
    remove
}