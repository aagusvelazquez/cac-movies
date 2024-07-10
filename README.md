# CAC-Movies Server

Este proyecto es un servidor que responde a consultas de películas. La estructura del proyecto está organizada con un enrutador y varios archivos para gestionar el frontend y backend.

## Estructura del Proyecto

CAC-Movies/
├── public/
│ ├── index.html
│ ├── movies.json
│ ├── static/
│ │ ├── css/
│ │ ├── img/
│ │ └── js/
│ └── template/
│ └── register.html
├── app.js
├── routes/
│ └── movieRouter.js
├── controllers/
│ └── movieController.js
└── db/
└── db.js (opcional)


## Requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Instalación

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/tu-usuario/CAC-Movies.git
   cd CAC-Movies


## Archivos Clave
- app.js
Configura y arranca el servidor con Express.

- routes/movieRouter.js
Define las rutas para manejar las consultas de películas.

- controllers/movieController.js
Contiene la lógica para responder a las consultas de películas.

- public/static/index.js
Maneja la conexión entre el frontend y el backend.

## Uso

## Licencia
Este proyecto está licenciado bajo la MIT License.