/** El controlador es el que tendrá los cambios más importantes
 * y es el que hará el tratamiento de la información. 
 */

// Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos
const db = require("../db/db");

/* DEFINICIÓN DE LAS SOLICITUDES */
// Petición del tipo GET - Obtiene las peliculas para introducir en 'Tendencias'
const getTrendingMovies = (req, res) => {
    const sql = "SELECT * FROM cac_movies.pelicula";
    // Envio de la consulta a la base de datos
    db.query(sql, (err, result) => {
        // En caso de error
        if (err) { throw err };
        // Mezclamos las películas de forma aleatoria
        const peliculas = result;
        // Seleccionamos las primeras 12 películas
        const peliculasSeleccionadas = peliculas.slice(0, 12);
        // Devolvemos las películas seleccionadas en formato JSON
        res.json(peliculasSeleccionadas);
    });
};

module.exports = {
    getTrendingMovies
};