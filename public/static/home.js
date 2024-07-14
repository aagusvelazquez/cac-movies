// Js para mostrar la clave de 'Mis Datos'
const inputIcon = document.querySelector(".eye-icon");
const inputPassword = document.getElementById("password");

inputIcon.addEventListener("click", () => {
  inputIcon.classList.toggle("fa-eye-slash");
  inputIcon.classList.toggle("fa-eye");
  inputPassword.type = inputPassword.type === "password" ? "text" : "password";
});

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
document.addEventListener('DOMContentLoaded', (event) => {checkDivElements('favorite-items')});

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
}

document.addEventListener('DOMContentLoaded', (event) => {
  changeIconOnHover('.favorites-movies-container', 'fa-regular fa-bookmark'); // Cambia la clase de ícono según tu necesidad
});