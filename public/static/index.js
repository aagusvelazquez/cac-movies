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
            <a onclick="mostrarInfo(${movie.idPelicula})">
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
            <div class="wrapper" onclick="mostrarInfo(${movie.idPelicula})">
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

// JS que inserta el nombre del usuario en el nav
const nombre = localStorage.getItem("nombre");

if (nombre) {
    const userName = document.getElementById("user-name");
    const lblUser = document.getElementById("lbl-user-name");
    const lblUserRegister = document.getElementById("lbl-user-register");
    const lblUserLogin = document.getElementById("lbl-user-login");
    lblUser.classList.remove("hidden");
    userName.innerText = nombre;
    lblUserRegister.classList.add("hidden");
    lblUserLogin.classList.add("hidden");
};

// JS que muestra el menú desplegable del usuario
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
});

// JS para mostrar la info de la pelicula
async function mostrarInfo(peliID) {
    try {
        // Obtenemos todas las pelicukas
        const response = await fetch('/movies/');
        const movies = await response.json();
        // Buscamos la pelicula que coinbcida con la seleccionada
        const movie = movies.find(movie => peliID === movie.idPelicula);
        const modal = document.getElementById("movie-info");
        console.log(movie);
        // Insertamos la información en el modal
        modal.innerHTML =
        `<div class="modal-content">
            <span class="close" onclick="cerrarModal()">
            <i class="fa-solid fa-x"></i>
            </span>
            <img src="${movie.imagen}" alt="${movie.titulo}" class="modal-movie-img">
            <div>
                <h2>${movie.titulo}</h2>
                <p>Dirigida por ${movie.director} - ${movie.estreno}</p>
                <p>Elenco: ${movie.actores_principales}</p>
                <p>${movie.sinopsis}</p>
                <div class="modal-movie-buttons">
                    <a href="${movie.trailer}" target="_blank" class="modal-movie-btn">Trailer</a>
                    <button class="modal-movie-btn">Agregar a Mis Cosas</button>
                </div>
            </div>
        </div>               
        `;
        modal.style.display = "block";
    } catch (error) {
        alert(error);
    };
};

function cerrarModal() {
    const modal = document.getElementById("movie-info");
    modal.style.display = "none";
};

// JS para cerrar sesión
document.getElementById("close-session").addEventListener('click', () => {
    // Borramos los datos del usuario del localStorage
    localStorage.clear();

    // Devolvemos a la normalidad el nav
    const lblUser = document.getElementById("lbl-user-name");
    const lblUserRegister = document.getElementById("lbl-user-register");
    const lblUserLogin = document.getElementById("lbl-user-login");
    lblUser.classList.add("hidden");
    lblUserRegister.classList.remove("hidden");
    lblUserLogin.classList.remove("hidden");
});

// Llamar a la función para obtener todas las películas al cargar la página
document.addEventListener('DOMContentLoaded', getTrendingMovies);
document.addEventListener('DOMContentLoaded', getAcclaimedMovies);