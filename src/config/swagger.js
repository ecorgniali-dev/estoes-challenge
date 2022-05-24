const swaggerOptions = {
    definition: {
        info: {
            title: 'Documentación API Rest Gestión de Proyectos',
            description:
                'Esta es una API RESTFul hecha con Express para administrar proyectos y asignarlos a usuarios'
        }      
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerOptions;
