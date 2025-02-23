export interface Pregunta {
    id: number;
    texto: string;
}

export interface Respuesta {
    id: number;
    texto: string;
    fuente: string; // Indica de qué libro proviene la respuesta
}