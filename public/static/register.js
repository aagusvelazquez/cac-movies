const formRegister = document.getElementById("formRegister");
const btnForm = document.getElementById("registerBtn");
const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const soloNumeros = /^[0-9]+$/;
const emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function clearValidations() {
    document.querySelector("#firstname").classList.remove('error');
    document.querySelector("#lastname").classList.remove('error');
    document.querySelector("#email").classList.remove('error');
    document.querySelector("#password").classList.remove('error');
    document.querySelector("#birthdate").classList.remove('error');
    document.querySelector("#country").classList.remove('error');
    document.querySelector("#error-firstname").textContent = '';
    document.querySelector("#error-lastname").textContent = '';
    document.querySelector("#error-email").textContent = '';
    document.querySelector("#error-password").textContent = '';
    document.querySelector("#error-birthdate").textContent = '';
    document.querySelector("#error-country").textContent = '';

};

function validarNombre() {
    const firstname = document.querySelector("#firstname").value;

    if (!firstname.trim()) {
        document.querySelector("#firstname").classList.add('error')
        document.querySelector("#error-firstname").textContent = 'Debe completar el campo Nombre';
        return false; // Indica que la validación falló
    } else if (!soloLetras.test(firstname)) {
        document.querySelector("#firstname").classList.add('error')
        document.querySelector("#error-firstname").textContent = 'Ingrese sólo letras';
        return false; // Indica que la validación falló
    };
    return true; // Indica que la validación fue exitosa
};

function validarApellido() {
    const lastname = document.querySelector("#lastname").value;

    if (!lastname.trim()) {
        document.querySelector("#lastname").classList.add('error')
        document.querySelector("#error-lastname").textContent = 'Debe completar el campo Apellido';
        return false; // Indica que la validación falló
    } else if (!soloLetras.test(lastname)) {
        document.querySelector("#lastname").classList.add('error')
        document.querySelector("#error-lastname").textContent = 'Ingrese sólo letras';
        return false; // Indica que la validación falló
    };
    return true; // Indica que la validación fue exitosa
};

function validarEmail() {
    const email = document.querySelector("#email").value;

    if (!email.trim()) {
        document.querySelector("#email").classList.add('error')
        document.querySelector("#error-email").textContent = 'Debe completar el campo Email';
        return false; // Indica que la validación falló
    } else if (!emailValido.test(email)) {
        document.querySelector("#email").classList.add('error')
        document.querySelector("#error-email").textContent = 'Ingrese un email válído';
        return false; // Indica que la validación falló
    };
    return true; // Indica que la validación fue exitosa
};

function validarPassword() {
    const password = document.querySelector("#password").value;
    
    if (!password.trim()) {
        document.querySelector("#error-password").textContent = 'Debe completar el campo contraseña';
        document.querySelector("#password").classList.add('error')
        return false; // Indica que la validación falló
    } else if (password.length < 6 || password.length > 12) {
        document.querySelector("#error-password").textContent = 'La contraseña debe contener entre 6 y 12 caracteres';
        document.querySelector("#password").classList.add('error')
        return false; // Indica que la validación falló
    };
    return true; // Indica que la validación fue exitosa
};

function validarNacimiento() {
    const birthdate = document.querySelector("#birthdate").value;

    if (!birthdate.trim()) {
        document.querySelector("#birthdate").classList.add('error')
        document.querySelector("#error-birthdate").textContent = 'Debe selecciona una Fecha de Nacimiento';
        return false; // Indica que la valdación falló
    };
    return true; // Indica que la validación fue exitosa
};

function validarPais() {
    const country = document.querySelector("#country").value;

    if (!country.trim()) {
        document.querySelector("#country").classList.add('error')
        document.querySelector("#error-country").textContent = 'Debe seleccionar un País';
        return false; // Indica que la validación falló
    };
    return true; // Indica que la validación fue exitosa
};

function validarFormulario() {
    if (!validarNombre() || !validarApellido() || !validarEmail() ||
    !validarPassword() || !validarNacimiento() || !validarPais()) {
        return false; // Formulario incompleto o inválido
    };
    return true; // Formulario completo y válido
};

btnForm.addEventListener('click', async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
        const nombre = document.querySelector("#firstname").value;
        const apellido = document.querySelector("#lastname").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const nacimiento = document.querySelector("#birthdate").value;
        const pais = document.querySelector("#country").value;
        
        const user = { nombre, apellido, email, password, nacimiento, pais };
    
        try {
            const response = await fetch('/movies/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            if (response.ok) {
                alert("¡Usuario creado con éxito!")
                clearValidations();
                formRegister.reset();
                return;
            } else {
                alert("¡Error al crear el usuario!");
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert("¡Error al crear el usuario!");
        };
    };

});