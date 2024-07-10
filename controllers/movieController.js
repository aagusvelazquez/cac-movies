/** El controlador es el que tendrá los cambios más importantes
 * y es el que hará el tratamiento de la información. 
 */

/* INICIO DEL TRATAMIENTO DEL ARCHIVO movies.json PARA PODER TRABAJARLO */
// Importamos el módulo de lectura fs
const fs = require("fs");

// Importamos el módulo path para normalizar rutas
const path = require("path");

// Normalizamos la dirección para utilizar el archivo movies.json
// path.join() toma como punto de partida al archivo moviesRouter.js
const moviesPath = path.join(__dirname, "../public/movies.json");

// Leemos y formateamos movies.json
/** fs.readFileSync()
 * 1° Parámetro -> ruta del archivo
 * 2° ParámEtro -> tipo de formato de lectura
 */
const archivoJSON = fs.readFileSync(moviesPath, "utf-8");

// Convertimos JSON a un array legible por JS
const movies = JSON.parse(archivoJSON);
/* FIN DEL TRATAMIENTO DEL ARCHIVO movies.json PARA PODER TRABAJARLO */


/* DEFINICIÓN DE LAS SOLICITUDES */
// Petición del tipo GET /movies/list
const getAllMovies = (req, res) => {
    res.json(movies);
};

// Petición del tipo GET - Ruta Paramétrica movies/1
const getMovieById = (req, res) => {
    // Alojamos en movie la pelicula con la primera coincidenca en el array movies
    // Comparamos el m.id con el ID que nos pide el cliente
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    // En caso de error
    if (!movie) {
        // Variable de estado 404
        const estado404 = res.status(404);
        return estado404.send("Película no encontrada.");
    };

    // En caso de éxito: enviamos la película encontrada
    res.json(movie);
};

// Solicitud del tipo POST - Cargar película en el movies.json
const createMovie =  (req, res) => {
    // Creamos un objeto con los datos del cuerpo de la solicitud
    const newMovie = {
        id: movies.length + 1,
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        qualification: req.body.qualification,
        synopsis: req.body.synopsis,
        trailer: req.body.trailer,
        main_actors: req.body.main_actors,
        image: req.body.image
    };

    // Añadimos la nueva pelicula dentro del array movies
    movies.push(newMovie);

    // Formateamos el array a formato JSON
    /** JSON.stringify()
     * 1° Parámetro -> array que transformará a formato JSON
     * 2° Parámetro -> función que afecta al array, en caso de no tener colocar null
     * 3° Parámetro -> formato del JSON en caso de querer presentarlo en pantalla,
     * si no colocamos nada lo arrojará en formato lineal de texto,
     * si queremos un formato colocamos un n° que corresponderá al identado
     */
    const moviesUpdated = JSON.stringify(movies, null, 2);

    // Guardamos el array en movies.json
    /** fs.writeFileSync();
     * 1° Parámetro -> ruta del archivo
     * 2° Parámetro -> archivo ya transformado que queremos guardar
     * 3° Parámetro -> formato de escritura
     */
    fs.writeFileSync(moviesPath, moviesUpdated, "utf-8");

    // En caso de éxito
    res.status(201).json({ mensaje: "Película agregada con éxito", movie: newMovie });
};

// Solicitud del tipo PUT - Actualizar datos de una película ya cargada
const updateMovie =  (req, res) => {
    // Buscamos la película con el ID solicitado
    const movie = movies.find(m => m.id === parseInt(req.params.id));

    // En caso de error
    if (!movie) {
        // Variable de estado 404
        const estado404 = res.status(404);
        return estado404.send("Película no encontrada.");
    };

    // En caso de éxito, proceso de modificación
    movie.title = req.body.title || movie.title;
    movie.director = req.body.director || movie.director;
    movie.year = req.body.year || movie.year;
    movie.qualification = req.body.qualification || movie.qualification;
    movie.synopsis = req.body.synopsis || movie.synopsis;
    movie.trailer = req.body.trailer || movie.trailer;
    movie.main_actors = req.body.main_actors || movie.main_actors;
    movie.image = req.body.title || movie.image;

    // Formateamos el array a formato JSON
    /** JSON.stringify()
     * 1° Parámetro -> array que transformará a formato JSON
     * 2° Parámetro -> función que afecta al array, en caso de no tener colocar null
     * 3° Parámetro -> formato del JSON en caso de querer presentarlo en pantalla,
     * si no colocamos nada lo arrojará en formato lineal de texto,
     * si queremos un formato colocamos un n° que corresponderá al identado
     */
    const movieUpdated = JSON.stringify(movies, null, 2);

    // Guardamos el array en movies.json
    /** fs.writeFileSync();
     * 1° Parámetro -> ruta del archivo
     * 2° Parámetro -> archivo ya transformado que queremos guardar
     * 3° Parámetro -> formato de escritura
     */
    fs.writeFileSync(moviesPath, movieUpdated, "utf-8");

    // En caso de éxito
    res.status(201).json({ mensaje: "Película actualizada con éxito", movie: movie });
};

// Solicitud del tipo DELETE - Elimina una película del movies.json
const deleteMovie = (req, res) => {
    // Buscamos el índice de la película con el ID solicitado
    const movie = movies.findIndex(m => m.id === parseInt(req.params.id));
    
    // En caso de error
    if (!movie) {
        res.status(404).JSON({mensaje:"Película no encontrada."});
    };

    // En caso de éxito, eliminamos la película del array
    movies.splice(movie, 1);

    // Formateamos el array a formato JSON
    /** JSON.stringify()
     * 1° Parámetro -> array que transformará a formato JSON
     * 2° Parámetro -> función que afecta al array, en caso de no tener colocar null
     * 3° Parámetro -> formato del JSON en caso de querer presentarlo en pantalla,
     * si no colocamos nada lo arrojará en formato lineal de texto,
     * si queremos un formato colocamos un n° que corresponderá al identado
     */
    const moviesUpdated = JSON.stringify(movies, null, 2);

    // Guardamos el array en movies.json
    /** fs.writeFileSync();
     * 1° Parámetro -> ruta del archivo
     * 2° Parámetro -> archivo ya transformado que queremos guardar
     * 3° Parámetro -> formato de escritura
     */
    fs.writeFileSync(moviesPath, moviesUpdated, "utf-8");

    res.status(201).json({ mensaje: "Película eliminada con éxito"});
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};