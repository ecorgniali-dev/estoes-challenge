const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.controller')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para manejar toda la información de los usuarios
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         description: Email del usuario asignado al proyecto
 *         example: juan_perez@correo.com
 *       firstName:
 *         type: string
 *         description: Nombre del usuario asignado al proyecto
 *         example: Juan
 *       lastName:
 *         type: string
 *         description: Apellido del usuario asignado al proyecto  
 *         example: Perez
 */


/**
 * @openapi
 * /users:
 *   get:
 *     summary: 'Listar todos los usuarios'
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: operación exitosa
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/definitions/User"
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.get('/', usersController.getAll)


/**
 * @openapi
 * /users:
 *   post:
 *     summary: 'Crear un nuevo usuario'
 *     tags: [Users]
 *     parameters:
 *     - name: 'body'
 *       in: body
 *       description: 'Campos necesarios para crear un registro'
 *       schema:
 *         $ref: "#/definitions/User"
 *     responses:
 *       201:
 *         description: recurso creado con éxito
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.post('/', usersController.create)


/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: 'Eliminar un usuario por su id'
 *     tags: [Users]
 *     parameters:
 *     - name: 'id'
 *       in: params
 *       description: 'Id del usuario a eliminar'
 *       schema:
 *         type: integer
 *         example: 1
 *     responses:
 *       201:
 *         description: usuario eliminado con éxito
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.delete('/:id', usersController.remove)

module.exports = router