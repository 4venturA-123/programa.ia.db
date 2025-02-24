const axios = require('axios');

// Reemplaza 'YOUR_API_KEY' con tu clave API de OpenAI
const apiKey = 'YOUR_API_KEY';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const question = '¿Cuál es la capital de Francia?';

const data = {
  prompt: question,
  max_tokens: 50,
  temperature: 0.7,
};

axios.post(apiUrl, data, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
})
.then(response => {
  console.log('Respuesta de OpenAI:', response.data.choices[0].text.trim());
})
.catch(error => {
  console.error('Error al llamar a la API de OpenAI:', error);
});