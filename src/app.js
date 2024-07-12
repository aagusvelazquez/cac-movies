/**
 * Crearemos un servidor con el módulo express
 * 1- Creamos archivo src/app.js
 * 2- Creamos la estructura del proyecto: CAC-Movies/src/app.js
 *                                        CAC-Movies/public/index.html
 *                                        CAC-Movies/static/css/index.css y register.css
 *                                        CAC-Movies/static/img
 *                                        CAC-Movies/static/index.js
 *                                        CAC-Movies/template/register.html
 *                                        CAC-Movies/routes/movieRouter.js
 *                                        CAC-Movies/controllers/movieController.js
 *                                        CAC-Movies/db/db.js
 * 3- nmp init -y . Crear script 'start'
 * 4- npm install express --save
 * 4- npm install mysql2 --save
 * 5- Configuramos en orden:
 * 5.1 - Codificamos app.js
 * 5.2 - Codificamos movieRouter.js
 * 5.3 - Codificamos movieController.js
 * 5.4 - Codificamos db.js
 **/

// Importamos lo módulo express
const express = require("express");

// Instanciamos express
const app = express();

// Importamos el módulo de path
const path = require("path");

// Llamamos a dot-env
require("dotenv").config();

// Declaramos el puerto
const PORT = process.env.PORT || 3000;

// Importamos módulo propio (Commomn JS)
const moviesRouter = require("../routes/moviesRouter");

/** Uso del middleware express.json
 * Este middleware nos permite analizar los cuerpos
 * de las solicitudes entrantes con formato JSON.
 * Se encarga de convertir el cuerpo de la solicitud
 * en un objeto Javascript accesible a través de req.body.
 */
app.use(express.json());

/** Definimos el prefijo principal de la ruta
 * 1° Parámetro -> String: ocupa el prefijo preincipal
 * 2° Parámetro -> el módulo enrutador que gestiona las subrutas
 */
app.use("/movies", moviesRouter);

// Configuración para servir archivos estáticos 
app.use(express.static('public'));

// Inicializamos al servidor
app.listen(PORT, () => {console.log(`Servidor escuchando el puerto ${PORT}`)});