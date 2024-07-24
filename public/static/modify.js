/* JS para insertar los datos del usuario */
// Capturamos los inputs
const nombreLbl = document.getElementById("user-nombre");
const apellidoLbl = document.getElementById("user-apellido");
const emailLbl = document.getElementById("user-email");
const nacLbl = document.getElementById("user-nacimiento");
const paisLbl = document.getElementById("user-pais");

// Insertamos los datos
nombreLbl.value = localStorage.getItem("nombre");
apellidoLbl.value = localStorage.getItem("apellido");
emailLbl.value = localStorage.getItem("email");
nacLbl.value = localStorage.getItem("nacimiento");
paisLbl.value = localStorage.getItem("pais");

// Función para modificar los datos
document.getElementById("user-data-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtenemos los datos que ingresó
    const nombre = document.getElementById("user-nombre").value;
    const apellido = document.getElementById("user-apellido").value;
    const email = document.getElementById("user-email").value;
    const nacimiento = document.getElementById("user-nacimiento").value;
    const pais = document.getElementById("user-pais").value;

    const user = { nombre, apellido, nacimiento, pais, email };

    try {
        const response = await fetch(`/movies/modify-data`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            alert("¡Se han modificado sus datos con éxito");
            // Lo redirecciona al inicio
            window.location.href = "../index.html";

            // Actualizamos la memoria del localStorage
            localStorage.setItem("nombre", nombre);
            localStorage.setItem("apellido", apellido);
            localStorage.setItem("email", email);
            localStorage.setItem("nacimiento", nacimiento);
            localStorage.setItem("pais", pais);
            
            return
        } else {
            alert("Error al modificar sus datos.");
            // Recarga la página
            location.reload();

            return
        }
    } catch (error) {
        console.error('Error al modificar sus datos. ', error);
        alert('Error al modificar sus datos.');
        return
    }
});

// JS para cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", () => {
    // Limpia el localStorage
    localStorage.clear();
    // Lo redirige al inicio
    window.location.href = "../index.html"
});