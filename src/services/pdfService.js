const fs = require('fs');
const pdf = require('pdf-parse');

const libros = [
    "C:/Users/jesus/OneDrive/Documentos/Estadistica para administracion y economia Levin et al.pdf",
    "C:/Users/jesus/OneDrive/Documentos/LIBRO-13-Estadistica-para-administracion-y-economia.pdf",
    "C:/Users/jesus/OneDrive/Documentos/Probabilidad y Estadistica para Ingenieria y Ciencias - Jay Devore - Septima Edicion.pdf"
];

const extraerTextoPDF = (ruta) => {
    return new Promise((resolve, reject) => {
        fs.readFile(ruta, (err, data) => {
            if (err) {
                return reject(err);
            }
            pdf(data).then((resultado) => {
                resolve(resultado.text);
            }).catch(reject);
        });
    });
};

const buscarEnLibros = async (pregunta) => {
    const resultados = [];
    for (const libro of libros) {
        const texto = await extraerTextoPDF(libro);
        if (texto.toLowerCase().includes(pregunta.toLowerCase())) {
            resultados.push(libro);
        }
    }
    return resultados;
};

module.exports = {
    buscarEnLibros
};