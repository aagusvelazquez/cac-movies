/** El controlador es el que tendrá los cambios más importantes
 * y es el que hará el tratamiento de la información. 
 */

// Importamos el módulo db.js
// El objeto db posee los métodos para conectar con la base de datos. 
// Es la conexión a la base de datos
const db = require("../db/db");

/* DEFINICIÓN DE LAS SOLICITUDES */
// Petición del tipo GET - Obtiene todas las peliculas para introducir en index.html
const getAllMovies = (req, res) => {
    const sql = "SELECT * FROM cac_movies.pelicula";
    // Envio de la consulta a la base de datos
    db.query(sql, (err, result) => {
        // En caso de error
        if (err) { throw err };
        res.json(result);
    });
};

// Petición del tipo POST - Carga un registro en la tabla "usuario" de la BBDD
const createUser = (req, res) => {
    // Desestructuramos la request 
    const { nombre, apellido, email, password, nacimiento, pais } = req.body;
    const sql = 'INSERT INTO cac_movies.usuario (nombre, apellido, email, password, nacimiento, pais) VALUES (?, ?, ?, ?, ?, ?)'; 0
    // Envio de la consulta a la base de datos
    db.query(sql, [nombre, apellido, email, password, nacimiento, pais], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json({ mensaje: "¡Usuario cargado con éxito!" });
    });
};

// Petición del tipo GET - Obtiene un registro de la tabla "usuario" de la BBDD
const getUser = (req, res) => {
    // Desestrucuramos la request
    const { email, password } = req.query;
    const sql = "SELECT * FROM cac_movies.usuario WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json(result);
    });
};

module.exports = {
    getAllMovies,
    createUser,
    getUser
};