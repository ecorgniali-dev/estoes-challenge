const User = require('../models/users.model')

const getAll = async () => {
    const users = await User.findAll()
    return users
}

const getById = async (userId) => {
    const user = await User.findByPk(userId)
    return user
}

const create = async (user) => {
    const newUser = await User.create(user)
    return newUser
}

const remove = async (id) => {
    const data = await User.destroy({ where: { id } })
    return data
}

module.exports = {
    getAll,
    getById,
    create,
    remove
}