// Función para obtener películas para 'Tendencias'
async function getTrendingMovies() {
    try {
        const response = await fetch('/movies/');
        const movies = await response.json();
        const primeras12 = movies.slice(0, 12);
        const moviesTrending = document.getElementById('list-popular');

        primeras12.forEach(movie => {
            // Creamos el elemento HTML
            const div = document.createElement("div");
            // Agregamos estilo
            div.classList.add("movie-item");
            // Inyectamos contenido a <div class="movie-item">
            div.innerHTML = `
        <a href="#">
            <img src="${movie.imagen}" alt="${movie.titulo}" class="movie-item-img">
            <div class="movie-item-detail">
                <p class="movie-item-detail-title">${movie.titulo}</p>
                <p class="movie-item-detail-subtitle">${movie.estreno} - ${movie.calificacion} ⭐</p>
            </div> 
        </a>
        `;
            // Inyectamos el contenido en el HTML
            moviesTrending.appendChild(div);
        });
    } catch (error) {
        console.error('Error al obtener las películas "Tendencia":', error);
    }
};

// Función para obtener películas para 'Más aclamadas'
async function getAcclaimedMovies() {
    try {
        const response = await fetch("/movies/");
        const movies = await response.json();
        // Filtrar las películas con calificación mayor o igual a 4
        const peliculasFiltradas = movies.filter(pelicula => pelicula.calificacion >= 4);
        // Ordenar las películas filtradas de forma descendente por calificación
        const peliculasOrdenadas = peliculasFiltradas.sort((a, b) => b.calificacion - a.calificacion);
        // Seleccionar las primeras 8 películas
        const primeras8Peliculas = peliculasOrdenadas.slice(0, 8);
        const acclaimedMovies = document.getElementById('list-top-rated');

        primeras8Peliculas.forEach(movie => {
            // Creamos el elemento HTML
            const div = document.createElement("div");
            // Agregamos estilo
            div.classList.add("movie-item-v2");
            // Inyectamos contenido a <div class="movie-item-v2">
            div.innerHTML = `
            <div class="wrapper">
                <img src="${movie.imagen}" alt="${movie.titulo}" class="movie-item-img-v2">
            </div>
            <div class="movie-item-detail-v2">
                <p class="movie-item-detail-title-v2">${movie.titulo}</p>
                <p class="movie-item-detail-subtitle-v2">${movie.calificacion} ⭐</p>
            </div>
            `;
            // Inyectamos el contenido en el HTML
            acclaimedMovies.appendChild(div);
        });

    } catch (error) {
        console.error('Error al obtener las películas "Más Aclamadas": ', error);
    }
};

// JS para el botón que va hacie arriba en el index.html
document.getElementsByClassName("upMain")[0].addEventListener("click", () => {
    // Desplazarse hasta la parte superior de la ventana
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Opcional: Para un desplazamiento suave
    });
});

// Llamar a la función para obtener todas las películas al cargar la página
document.addEventListener('DOMContentLoaded', getTrendingMovies);
document.addEventListener('DOMContentLoaded', getAcclaimedMovies);