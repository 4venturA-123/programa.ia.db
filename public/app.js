import { PDFDocument } from 'pdf-lib';
import { Configuration, OpenAIApi } from 'openai';

// Configuración de OpenAI
const configuration = new Configuration({
    apiKey: 'TU_API_KEY_DE_OPENAI',
});
const openai = new OpenAIApi(configuration);

// Función para extraer texto de un PDF
async function extractTextFromPDF(pdfUrl) {
    const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    let text = '';
    for (const page of pages) {
        const textContent = await page.getTextContent();
        textContent.items.forEach(item => {
            text += item.str + ' ';
        });
    }
    return text;
}

// URLs de los PDFs
const pdfUrls = [
    'C:/Users/jesus/OneDrive/Documentos/Probabilidad y Estadistica para Ingenieria y Ciencias - Jay Devore - Septima Edicion.pdf',
    'C:/Users/jesus/OneDrive/Documentos/LIBRO-13-Estadistica-para-administracion-y-economia.pdf',
    'C:/Users/jesus/OneDrive/Documentos/Estadistica para administracion y economia Levin et al.pdf'
];

document.getElementById('enviar').addEventListener('click', async function() {
    const pregunta = document.getElementById('pregunta').value;
    if (pregunta.trim() === '') {
        alert('Por favor, escribe una pregunta.');
        return;
    }

    // Extraer texto de todos los PDFs
    let pdfText = '';
    for (const pdfUrl of pdfUrls) {
        pdfText += await extractTextFromPDF(pdfUrl) + '\n';
    }

    // Generar respuesta usando OpenAI GPT
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Responde la siguiente pregunta basada en el siguiente texto: ${pdfText}\nPregunta: ${pregunta}\nRespuesta:`,
        max_tokens: 150,
    });

    const respuesta = response.data.choices[0].text.trim();

    // Mostrar la respuesta
    document.getElementById('texto-respuesta').innerText = respuesta;
    document.getElementById('respuesta').style.display = 'block';

    // Agregar la pregunta al historial
    const listaPreguntas = document.getElementById('lista-preguntas');
    const nuevaPregunta = document.createElement('li');
    nuevaPregunta.innerText = pregunta;
    listaPreguntas.appendChild(nuevaPregunta);

    // Limpiar el campo de entrada
    document.getElementById('pregunta').value = '';
});

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

        if (response.ok) {
            const data = await response.json();
            const chatContainer = document.getElementById('chat-container');
            
            // Crear y agregar el elemento de la pregunta
            const preguntaElem = document.createElement('div');
            preguntaElem.className = 'chat-message user-message';
            preguntaElem.innerText = `Tú: ${pregunta}`;
            chatContainer.appendChild(preguntaElem);

            // Crear y agregar el elemento de la respuesta
            const respuestaElem = document.createElement('div');
            respuestaElem.className = 'chat-message ai-message';
            respuestaElem.innerText = `IA: ${data.respuesta}`;
            chatContainer.appendChild(respuestaElem);

            // Limpiar el campo de entrada
            document.getElementById('pregunta').value = '';

            // Desplazar el contenedor de chat hacia abajo
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
            alert('Error al obtener la respuesta. Inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al enviar la pregunta:', error);
        alert('Error al enviar la pregunta. Inténtalo de nuevo.');
    }
});