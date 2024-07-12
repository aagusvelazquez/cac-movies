/** ENRUTADOR Y ENDPOINT */
/** Router: un router en Express es una manera de agrupar rutas relacionadas
 * Es como un mini-servidor dentro del servidor principal.
 * Ayuda a organizar el código cuando tenés muchas rutas.
 * Cuando accede a '/sub_ruta' en tu navegador la aplicación:
 * 1° Buscará la ruta '/movies' en el archivo principal (app.js)
 * 2° Delega el manejo de esa ruta al router moviesRouter
 * 3° Por ejemplo, moviesRouter.js encuentra la subruta '/list' y
 * ejecuta la función correspondiente que devuelve "sub_ruta"
 */
// Importamos el módulo express
const express = require("express");

// Instanciamos el router de Express
const router = express.Router();

// Importamos el controlador de funciones
const movieController = require("../controllers/movieController")

/* DEFINICIÓN DE LAS SOLICITUDES */
// Petición del tipo GET / introduce las pelicuals en 'Tendencia'
router.get(`/`, movieController.getTrendingMovies);


module.exports = router;