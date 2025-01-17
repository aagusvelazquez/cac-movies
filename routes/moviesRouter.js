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
// Petición del tipo GET '/' introduce las peliculas en 'Tendencia'
router.get(`/`, movieController.getAllMovies);

// Petición del tipo POST '/register' Crea un usuario
router.post('/register', movieController.createUser);

// Petición del tipo GET '/login' para que el usuario ingrese
router.get('/login', movieController.getUser);

// Peticion del tipo POST '/add-my-things' para agregar peliculas a 'Mis Cosas'
router.post('/add-my-things', movieController.addMovie);

// Petición del tipo GET '/my-things' en el home del usuario
router.get('/my-things', movieController.getFavoriteMovies);

// Petición del tipo REMOVE '/remove-my-things' en el home del usuario
router.delete('/remove-my-things', movieController.removeMovie);

// Petición del tipo PUT '/modify-data' para modificar los datos del usuario
router.put('/modify-data', movieController.modifyData);

module.exports = router;