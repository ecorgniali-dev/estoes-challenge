const usersRepositorie = require('../repositories/users.repositorie')

const getAll = async () => {
    const users = await usersRepositorie.getAll()
    return users
}

const create = async (data) => {
    const newUser = await usersRepositorie.create(data)
    return newUser
}

const remove = async (userId) => {
    const user = await usersRepositorie.getById(userId)
    if (user === null) {
        const error = new Error(`User with id ${userId} does not exist`)
        error.status = 404
        throw error
    }
    const data = await usersRepositorie.remove(userId)
    return data
}

module.exports = {
    getAll,
    create,
    remove
}