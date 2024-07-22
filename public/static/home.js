// JS que modifica el position del #footer y oculta el .hidden-text
function checkDivElements(footer) {
    const div = document.getElementById(footer);
    if (div) {
        if (div.children.length > 0) {
            const text = document.getElementById("hidden-text");
            text.style.display = "none";
        }
    };
};

// Llama a la función para verificar el div con el id "favorite-items"
document.addEventListener('DOMContentLoaded', (event) => { checkDivElements('favorite-items') });

// JS para modificar el icon del botón 'Quitar de Mis Cosas'
function changeIconOnHover(buttonsContainerSelector, newIconClass) {
    const container = document.querySelector(buttonsContainerSelector);
    if (container) {
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
            const icon = button.querySelector('i');
            if (icon) {
                const originalIconClass = icon.className;

                button.addEventListener('mouseover', () => {
                    icon.className = newIconClass;
                });

                button.addEventListener('mouseout', () => {
                    icon.className = originalIconClass;
                });
            } else {
                console.log(`El botón no contiene una etiqueta <i>.`);
            }
        });
    } else {
        console.log(`El contenedor con selector "${buttonsContainerSelector}" no existe.`);
    }
};

// Función para obtener las peliculas en 'Mis Cosas'
async function getFavoriteMovies() {
    let email = localStorage.getItem("email");
    
    try {
        const response = await fetch(`/movies/my-things?email=${email}`);
        const movies = await response.json();
        const favoritesMoviesLbl = document.getElementById('favorite-items');
        console.log(movies);

        movies.forEach(movie => {
            // Creamos el elemento HTML
            const div = document.createElement("div");
            // Agregamos estilo
            div.classList.add("favorite-movie");
            // Inyectamos contenido a <div class="favorite-movie">
            div.innerHTML = `
            <button title="Quitar de 'Mis Cosas'"><i class="fa-solid fa-bookmark"></i></button>
            <img src="${movie.imagen}" alt="${movie.titulo}">
            <div class="favorite-movie-detail">
                <p class="favorite-movie-detail-title">${movie.titulo} - ${movie.calificacion} ⭐</p>
            </div> 
            `;
            // Inyectamos el contenido en el HTML
            favoritesMoviesLbl.appendChild(div);
        });
    } catch (error) {
        console.error('Error al obtener las películas', error);
    }
};

document.addEventListener('DOMContentLoaded', (event) => {
    changeIconOnHover('.favorites-movies-container', 'fa-regular fa-bookmark'); // Cambia la clase de ícono según tu necesidad
});

// Llamar a la función para obtener todas las películas al cargar la página
document.addEventListener('DOMContentLoaded', getFavoriteMovies);