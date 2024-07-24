// Función para iniciar sesión
const formRegister = document.getElementById("formLogin");
const btnForm = document.getElementById("loginBtn");

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
        const response = await fetch(`/movies/login/?email=${email}&password=${password}`);

        if (response.ok) {
            // Si puede obtener información, crea el objeto user con toda la información en formato json
            const user = await response.json();

            // Guardamos algunos datos del usuario en el localStorage
            localStorage.setItem("nombre", user[0].nombre);
            localStorage.setItem("apellido", user[0].apellido);
            localStorage.setItem("email", user[0].email);
            localStorage.setItem("pais", user[0].pais);
            // Formatea la fecha a aaaa-mm-dd
            const date = user[0].nacimiento;
            const dateFormat = date.toString().split("T")[0];
            localStorage.setItem("nacimiento", dateFormat);

            // Formatea la fecha a aaaa-mm-dd

            formRegister.reset();
            window.location.href = '../index.html';
        } else {
            alert("¡Email o contraseña inválidos!");
            location.reload();
        return
        };
    } catch (error) {
        console.error('Email o contraseña inválidos:', error);
        alert("¡Email o contraseña inválidos!");
        location.reload();
        return
    };
});