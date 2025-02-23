document.getElementById('preguntar').addEventListener('click', async () => {
    const pregunta = document.getElementById('pregunta').value;
    if (pregunta.trim() === '') {
        alert('Por favor, escribe una pregunta.');
        return;
    }

    try {
        const response = await fetch('/api/preguntar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pregunta })
        });

        const data = await response.json();
        document.getElementById('respuesta-texto').innerText = data.respuesta;
        document.getElementById('respuesta').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al obtener la respuesta. Inténtalo de nuevo más tarde.');
    }
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { setRoutes } = require('./src/routes/index');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/marianita-ai', { useNewUrlParser: true, useUnifiedTopology: true });

const PreguntaSchema = new mongoose.Schema({
    pregunta: String,
    respuesta: String
});

const Pregunta = mongoose.model('Pregunta', PreguntaSchema);

app.post('/api/preguntar', async (req, res) => {
    const { pregunta } = req.body;

    document.getElementById('pregunta').addEventListener('input', obtenerRespuestaAutomatica);
    const respuesta = `Esta es una respuesta generada para la pregunta: ${pregunta}`;

    const nuevaPregunta = new Pregunta({ pregunta, respuesta });
    await nuevaPregunta.save();

    res.json({ respuesta });
});

// Configuración de rutas
setRoutes(app);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
