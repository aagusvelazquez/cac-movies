// Función para obtener las peliculas en 'Mis Cosas'
async function getFavoriteMovies() {
    let email = localStorage.getItem("email");

    try {
        const response = await fetch(`/movies/my-things?email=${email}`);
        const movies = await response.json();
        const favoritesMoviesLbl = document.getElementById('favorite-items');
        const hiddenText = document.getElementById("hidden-text");

        movies.forEach(movie => {
            // Ocultamos el texto de aviso
            hiddenText.style.display = "none";
            // Creamos el elemento HTML
            const div = document.createElement("div");
            // Agregamos estilo
            div.classList.add("favorite-movie");
            // Inyectamos contenido a <div class="favorite-movie">
            div.innerHTML = `
            <a onclick="mostrarInfo(${movie.idPelicula})">
                <img src="${movie.imagen}" alt="${movie.titulo}">
                <div class="favorite-movie-detail">
                    <p class="favorite-movie-detail-title">${movie.titulo} - ${movie.calificacion} ⭐</p>
                </div>
            </a>
            `;
            // Inyectamos el contenido en el HTML
            favoritesMoviesLbl.appendChild(div);
        });
    } catch (error) {
        console.error('Error al obtener las películas', error);
    };
};

// JS para mostrar la info de la pelicula
async function mostrarInfo(peliID) {
    try {
        // Obtenemos todas las pelicukas
        const response = await fetch('/movies/');
        const movies = await response.json();
        // Buscamos la pelicula que coinbcida con la seleccionada
        const movie = movies.find(movie => peliID === movie.idPelicula);
        const modal = document.getElementById("movie-info");
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
                    <button class="modal-movie-btn" onclick="removeMovie(${movie.idPelicula})">Quitar de Mis Cosas</button>
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

// Función quitar de 'Mis Cosas' las películas
async function removeMovie(peliID) {
    let email = localStorage.getItem("email");
    let idPelicula = peliID;

    const movie = { email, idPelicula };

    try {
        const response= await fetch('/movies/remove-my-things', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        if (!response) {
            alert('Error al quitar la película.');
        } else {
            // Recarga la página
            location.reload();
        }
    } catch (error) {
        console.error('Error al quitar la película: ', error);
        alert('Error al quitar la película: '+ error)
    };

};

// JS para cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", () => {
    // Limpia el localStorage
    localStorage.clear();
    // Lo redirige al inicio
    window.location.href = "../index.html"
});

// Llamar a la función para obtener todas las películas al cargar la página
document.addEventListener('DOMContentLoaded', getFavoriteMovies);