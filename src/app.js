

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

// Inicializamos al servidor
app.listen(PORT, () => {console.log(`Servidor escuchando el puerto ${PORT}`)});