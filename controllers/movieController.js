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

// Petición del tipo POST - Agrega películas a 'Mis Cosas'
const addMovie = (req, res) => {
    // Desestructuramos la request
    const { email, idPelicula } = req.body;
    const sql = "INSERT INTO favorito (usuario_email, pelicula_idPelicula) VALUES (?, ?)";
    db.query(sql, [email, idPelicula], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json({mensaje: "Pelicula agregada a 'Mis Cosas'"});
    });
};

// Petición del tipo GET - Obtiene las peliculas agregadas a 'Mis Cosas'
const getFavoriteMovies = (req, res) => {
    // Desestructuramos la request
    const { email } = req.query;
    const sql = "SELECT f.usuario_email, p.idPelicula, p.titulo, p.director, p.estreno, p.calificacion, p.imagen FROM cac_movies.favorito f JOIN cac_movies.pelicula p ON f.pelicula_idPelicula = p.idPelicula WHERE f.usuario_email = ?;";
    db.query(sql, [email], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json(result);
    });
};

// Petición del tipo DELETE - Elimina peliculas de 'Mis Cosas'
const removeMovie = (req, res) => {
    // Desestructuramos la request
    const {email, idPelicula} = req.body;
    const sql = "DELETE FROM cac_movies.favorito WHERE usuario_email = ? AND pelicula_idPelicula = ?;";
    db.query(sql, [email, idPelicula], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json({mensaje: "Pelicula eliminada de 'Mis Cosas'"});
    });
};

// Peticion del tipo PUT - Modifica datos del usuario
const modifyData = (req, res) => {
    // Desestrucuramos la request
    const { nombre, apellido, nacimiento, pais, email } = req.body;
    // Creamos la consulta para modificar los datos
    const sql = "UPDATE usuario SET nombre = ?, apellido = ?, nacimiento = ?, pais = ? WHERE email = ?";
    db.query(sql, [ nombre, apellido, nacimiento, pais, email ], (err, result) => {
        // Si sucede un error
        if (err) throw err;
        // Si todo sale bien
        res.json({ mensaje: "¡Datos del usuario modificados con éxito!"});
    });
}   

module.exports = {
    getAllMovies,
    createUser,
    getUser,
    addMovie,
    getFavoriteMovies,
    removeMovie,
    modifyData
};