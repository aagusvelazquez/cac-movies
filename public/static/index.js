// URL del servidor
const PORT = 3000;
const SERVER_URL = `http://localhost:${PORT}/movies/list`;

// Declaración del objeto literal
const opciones = {
    method: "GET",
    headers: {
        accept: "application/json"
    }
};

function cargarPelis() {
    fetch("./movies.json", opciones)
        .then((response) => { return response.json() })
        // Mnipulaicón del DOM
        .then(peliculas => {
            // Mezclamos las películas de forma aleatoria
            peliculas.sort(() => Math.random() - 0.5);
            // Seleccionamos las primeras 12 películas
            const peliculasSeleccionadas = peliculas.slice(0, 12);
            // Obtenemos el contenedor donde renderizamos las tarjetas
            const moviesPopular = document.getElementById("list-popular");
            // Utilizamos un for-each para cargar objetos al DOM
            peliculasSeleccionadas.forEach(pelicula => {
                // Creamos el elemento HTML
                const div = document.createElement("div");
                // Agregamos estilo
                div.classList.add("movie-item");
                // Inyectamos contenido a <div class="movie-item">
                div.innerHTML = `
                <a href="#">
                    <img src="${pelicula.image}" alt="${pelicula.title}" class="movie-item-img">
                    <div class="movie-item-detail">
                        <p class="movie-item-detail-title">${pelicula.title}</p>
                        <p class="movie-item-detail-subtitle">${pelicula.year} - ${pelicula.qualification} ⭐</p>
                    </div> 
                </a>
                `;
                // Inyectamos el contenido en el HTML
                moviesPopular.appendChild(div);
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

// Llamamos a la función para cargar las peliculas
cargarPelis();