const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const AIModel = require('./ai/model');
const { extractTextFromPDFs } = require('./utils/pdfUtils');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const aiModel = new AIModel();

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/marianita-ai', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Definir esquema y modelo
const PreguntaSchema = new mongoose.Schema({
    pregunta: String,
    respuesta: String
});

const Pregunta = mongoose.model('Pregunta', PreguntaSchema);

// Endpoint de la API
app.post('/api/preguntar', async (req, res) => {
    const { pregunta } = req.body;

    try {
        // Extraer texto de los PDFs
        const pdfText = await extractTextFromPDFs([
            'C:/Users/jesus/OneDrive/Documentos/Probabilidad y Estadistica para Ingenieria y Ciencias - Jay Devore - Septima Edicion.pdf',
            'C:/Users/jesus/OneDrive/Documentos/LIBRO-13-Estadistica-para-administracion-y-economia.pdf',
            'C:/Users/jesus/OneDrive/Documentos/Estadistica para administracion y economia Levin et al.pdf'
        ]);

        // Usar el modelo de IA para generar la respuesta
        const respuesta = aiModel.processInput(pregunta, pdfText);

        const nuevaPregunta = new Pregunta({ pregunta, respuesta });
        await nuevaPregunta.save();

        res.json({ respuesta });
    } catch (error) {
        console.error('Error al procesar la pregunta:', error);
        res.status(500).json({ error: 'Error al procesar la pregunta' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});