// docSwagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = swaggerJsDoc({
    definition: {
        info: {
            title: 'Documentación API Rest Gestión de Proyectos',
            description:
                'Esta es una API RESTFul hecha con Express para administrar proyectos y asignarlos a usuarios'
        }      
    },
    apis: ['./src/routes/*.js'],
})

module.exports = {
    swaggerUi,
    swaggerDocs
}
