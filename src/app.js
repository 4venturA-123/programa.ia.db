const express = require('express');
const bodyParser = require('body-parser');
const { setRoutes } = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de rutas
setRoutes(app);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});