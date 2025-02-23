# Marianita AI

Marianita es un asistente de inteligencia artificial diseñado para responder preguntas sobre libros de estadística y probabilidad. Esta aplicación web permite a los usuarios interactuar con el asistente y obtener información relevante de los libros en formato PDF.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
marianita-ai
├── public
│   ├── index.html          # Página principal de la aplicación web
│   └── styles.css         # Estilos CSS para la interfaz
├── src
│   ├── app.js             # Punto de entrada de la aplicación
│   ├── controllers
│   │   └── assistantController.js  # Controlador para manejar solicitudes
│   ├── routes
│   │   └── index.js       # Configuración de rutas
│   ├── services
│   │   └── pdfService.js   # Lógica para manejar archivos PDF
│   └── types
│       └── index.js       # Tipos e interfaces utilizados en la aplicación
├── package.json            # Configuración de npm
├── README.md               # Documentación del proyecto
└── server.js               # Inicialización del servidor
```

## Instalación

1. Clona el repositorio en tu máquina local.
2. Navega al directorio del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

   ```
   npm install
   ```

## Ejecución

Para iniciar la aplicación, utiliza el siguiente comando:

```
node server.js
```

Luego, abre tu navegador y dirígete a `http://localhost:3000` para interactuar con Marianita.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.