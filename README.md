# CAC-Movies Server

Este proyecto es un servidor que responde a consultas de películas. La estructura del proyecto está organizada con un enrutador y varios archivos para gestionar el frontend y backend.

## Estructura del Proyecto

CAC-Movies/
├── public/
│ ├── index.html
│ ├── favicon.ico
│ ├── static/
│ │ ├── css/
│ │ ├── img/
│ │ ├── home.js
│ │ ├── index.js
│ │ ├── login.js
│ │ ├── modify.js
│ │ └── register.js
│ └── template/
│ ├── home.html
│ ├── login.html
│ ├── modify.html
│ └── register.html
├── src/
│ └── app.js
├── routes/
│ └── movieRouter.js
├── controllers/
│ └── movieController.js
└── db/
  └── db.js


## Requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Archivos Clave
- app.js
Configura y arranca el servidor con Express.

- routes/movieRouter.js
Define las rutas para manejar las consultas de películas.

- controllers/movieController.js
Contiene la lógica para responder a las consultas de películas.

- public
Contiene los archivos para la conexión entre el Frontend y el Backend.

## Licencia
Este proyecto está licenciado bajo la MIT License.