class AssistantController {
    constructor(pdfService) {
        this.pdfService = pdfService;
    }

    async responderPregunta(req, res) {
        const pregunta = req.body.pregunta;

        try {
            const respuesta = await this.pdfService.buscarEnLibros(pregunta);
            res.json({ respuesta });
        } catch (error) {
            res.status(500).json({ error: 'Error al procesar la pregunta' });
        }
    }
}

export default AssistantController;