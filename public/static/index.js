// Función para obtener todas las películas
async function getTrendingMovies() {
    try {
      const response = await fetch('/movies/');
      const movies = await response.json();
      const moviesTrending = document.getElementById('list-popular');
      
      movies.forEach(movie => {
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
      console.error('Error al obtener las películas:', error);
    }
  }

  // Llamar a la función para obtener todas las películas al cargar la página
  document.addEventListener('DOMContentLoaded', getTrendingMovies);