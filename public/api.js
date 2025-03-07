document.getElementById('preguntar').addEventListener('click', function() {
    const question = document.getElementById('pregunta').value;
    const apiKey = '';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

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
        document.getElementById('responseOutput').innerText = response.data.choices[0].text.trim();
    })
    .catch(error => {
        console.error('Error al llamar a la API de OpenAI:', error);
        document.getElementById('chat-container').innerText = 'Hubo un error al obtener la respuesta.';
    });
});