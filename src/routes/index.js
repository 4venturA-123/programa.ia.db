const express = require('express');
const AssistantController = require('../controllers/assistantController');

const router = express.Router();
const assistantController = new AssistantController();

function setRoutes(app) {
    router.post('/pregunta', assistantController.responderPregunta.bind(assistantController));
    app.use('/api', router);
}

module.exports = setRoutes;