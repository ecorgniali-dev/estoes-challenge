const express = require('express')
const router = express.Router()

const projectsController = require('../controllers/projects.controller')

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Endpoints para manejar toda la información de los proyectos
 * definitions:
 *   Project:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         descripcion: id del proyecto
 *         example: 1
 *       name:
 *         type: string
 *         descripcion: Nombre del proyecto
 *         example: Landing page
 *       description:
 *         type: string
 *         descripcion: Descripcion del proyecto
 *         example: Elaboración de una landing page para ecommerce
 *       status:
 *         type: string
 *         descripcion: Estado del proyecto
 *         example: enabled  
 *       project_manager_id:
 *         type: number
 *         descripcion: Administrador del proyecto
 *       users:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               description: Nombre del usuario asignado al proyecto
 *               example: Juan
 *             lastName:
 *               type: string
 *               description: Apellido del usuario asignado al proyecto  
 *               example: Perez
 */


/**
 * @openapi
 * /projects:
 *   get:
 *     summary: 'Listar todas los proyectos paginados / Buscar un proyecto por su nombre'
 *     description:
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Numero de pagina de la cual desea obtener los registros
 *         example: 2
 *       - in: query
 *         name: 'name'
 *         description: Nombre del proyecto a buscar
 *         example: landing
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: operación exitosa
 *         schema:
 *           type: object
 *           properties:
 *             pagesUrl:
 *               type: object
 *               properties:
 *                 previous:
 *                   type: string
 *                   description: 'url página previa'
 *                   example: 'http://localhost:3000/news/?page=1'
 *                 next:
 *                   type: string
 *                   description: 'url página siguiente'
 *                   example: 'http://localhost:3000/news/?page=3'
 *             itemsCount:
 *               type: number
 *               description: 'Total de registros'
 *               example: 10
 *             totalPages:
 *               type: number
 *               description: 'Total de páginas'
 *               example: 4
 *             data:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/Project"
 *       400:
 *         description: Error en la solicitud
 *         schema: 
 *           type: object
 *           properties:
 *             errors:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   value:
 *                     type: string
 *                     example: 99
 *                   msg:
 *                     type: string
 *                     description: Mensaje que hace referencia al error
 *                     example: La página no existe
 *                   param:
 *                     type: string
 *                     description: Parametro que origina el error
 *                     example: page
 *                   location:
 *                     type: string
 *                     example: query
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.get('/', projectsController.getAll)


/**
 * @openapi
 * /projects/{id}:
 *   get:
 *     summary: 'Listar un proyecto por su id'
 *     parameters:
 *       - in: param
 *         name: id
 *         schema:
 *           type: integer
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: operación exitosa
 *         schema:
 *           type: object
 *           properties:
 *             data:
 *               $ref: "#/definitions/Project"                 
 *       404:
 *         description: 'Bad request'
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: El proyecto con id 99 no existe
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.get('/:id', projectsController.getById)

/**
 * @openapi
 * /projects:
 *   post:
 *     summary: 'Crear un nuevo proyecto'
 *     tags: [Projects]
 *     parameters:
 *     - name: 'body'
 *       in: body
 *       description: 'Campos necesarios para crear un registro'
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             descripcion: Nombre del nuevo proyecto
 *             example: Landing Page
 *           description:
 *             type: string
 *             descripcion: Descripción del nuevo proyecto
 *             example: Proyecto para la firma XXXXX. Landing Page ecommerce UX/UI
 *           status:
 *             type: string
 *             descripcion: Estado actual del proyecto
 *             example: enabled
 *           project_manager_id:
 *             type: number
 *             descripcion: Id del usuario asignado como adminsitrador del proyecto
 *             example: 1
 *           users_id:
 *             type: array
 *             description: Id de los usuarios asignados al proyecto
 *             example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: recurso creado con éxito
 *       404:
 *         description: 'Bad request'
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: El usuario que intenta asociar al proyecto no existe
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.post('/', projectsController.create)


/**
 * @openapi
 * /projects/{id}:
 *   put:
 *     summary: 'Actualizar un proyecto por su id'
 *     tags: [Projects]
 *     parameters:
 *     - name: 'id'
 *       in: param
 *       description: Id del proyecto que desea actualizar
 *       schema:
 *         type: integer
 *     - name: 'body'
 *       in: body
 *       description: 'Campos necesarios para actualizar el proyecto'
 *       schema:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             descripcion: Nombre del nuevo proyecto
 *             example: Nueva Landing Page
 *           description:
 *             type: string
 *             descripcion: Descripción del nuevo proyecto
 *             example: Nuevo Proyecto para la firma XXXXX. Landing Page ecommerce UX/UI
 *           status:
 *             type: string
 *             descripcion: Estado actual del proyecto
 *             example: enabled
 *           project_manager_id:
 *             type: number
 *             descripcion: Id del usuario asignado como adminsitrador del proyecto
 *             example: 1
 *           users_id:
 *             type: array
 *             description: Id de los usuarios asignados al proyecto
 *             example: [1, 2, 3]
 *     responses:
 *       201:
 *         description: recurso actualizado con éxito
 *       404:
 *         description: 'Bad request'
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: El proyecto que intenta actualizar no existe
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.put('/:id', projectsController.update)


/**
 * @openapi
 * /projects/{id}:
 *   delete:
 *     summary: 'Eliminar un proyecto por su id'
 *     tags: [Projects]
 *     parameters:
 *     - name: 'id'
 *       in: 'path'
 *       description: 'ID la proyecto a eliminar'
 *     responses:
 *       200:
 *         description: 'operación exitosa'
 *       404:
 *         description: 'Bad request'
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: El proyecto que intenta eliminar no existe
 *       500:
 *         description: Error de servidor
 *         schema: 
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Error interno de servidor
 */
router.delete('/:id', projectsController.remove)

module.exports = router
