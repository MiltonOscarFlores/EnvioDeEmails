// VARIABLES ////////////////////////
/////////////////////////////////////
const botonEnviar = document.querySelector("#enviar");
const botonReset = document.querySelector("#resetBtn")
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
const er =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; // expresion regular para validad emails

const spinner = document.querySelector("#spinner")

// EVENTOS //////////////////////////
/////////////////////////////////////
eventListeners();

function eventListeners() {
    // esta funcion inicia todo cuando carga el DOM
    document.addEventListener("DOMContentLoaded", iniciarApp);


    email.addEventListener("blur", validarFormulario); // Campos del formulario
    asunto.addEventListener("blur", validarFormulario); // Campos del formulario
    mensaje.addEventListener("blur", validarFormulario); // Campos del formulario
    formulario.addEventListener("submit", enviarEmail) // Envia el formulario
    botonReset.addEventListener("click", resetearFormulario) // resetea el formulario cuando clickeo el boton RESET

}

// FUNCIONES ////////////////////////
/////////////////////////////////////
function iniciarApp() {
    botonEnviar.disabled = true;
    botonEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {


    if (e.target.value.length > 0) { // compruebo con length si la cantidad de caracteres es mayor a 0

        // elimino todos los errores que estan y no deberian estar
        const error = document.querySelector("p.error"); // accedo al parrafo que tenga la clase error
        if (error) {
            error.remove();
        } // elimino el parrafo en cuestion

        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios");
    }

    // compruebo el email con una expresion regular
    if (e.target.type === "email") {


        if (er.test(e.target.value)) {
            const error = document.querySelector("p.error"); // accedo al parrafo que tenga la clase error
            if (error) {
                error.remove();
            } // elimino el parrafo en cuestion
            e.target.classList.remove("border", "border-red-500");
            e.target.classList.add("border", "border-green-500");
        } else {
            e.target.classList.remove("border", "border-green-500");
            e.target.classList.add("border", "border-red-500");
            mostrarError("El email no es valido");
        }
    }

    if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
        botonEnviar.disabled = false
        botonEnviar.classList.remove("cursor-not-allowed", "opacity-50")
    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(
        "border",
        "border-red-500",
        "background-red-100",
        "text-red-500",
        "p-3",
        "mt-5",
        "text-center",
        "error"
    );

    const errores = document.querySelectorAll(".error");
    // si ya hay un .error pintado en pantalla entonces no sigue mostrando mas errores
    if (errores.length === 0) {
        //appendChild agrega el elemento hijo al final de el resto de elementos del padre
        formulario.appendChild(mensajeError);
    }
}

function enviarEmail(e) {
    e.preventDefault()

    spinner.style.display = "flex" // para que apareza el spinner que tiene display none

    setTimeout(() => { // a los 2.5 segundos, desaparece el spiner y aparece el mensaje de ENVIADO
        spinner.style.display = "none"
        const mensajeEnviado = document.createElement("p") // creo un parrafo para mostrar que el msj fue ENVIADO
        mensajeEnviado.textContent = "Email enviado exitosamente!" // aca le doy el msj que llevara ese parrafo
        mensajeEnviado.classList.add("text-center", "my-10", "p-2", "bg-green-500", "text-white", "font-bold") // los estilos
        // y ahora lo muesto con insertBefore
        formulario.insertBefore(mensajeEnviado, spinner) // en el formulario padre, antes del elemento spinner

        setTimeout(() => { // a los 5 seg de ejecutada la funcion,quito el msj de ENVIADO
            mensajeEnviado.remove()
            resetearFormulario()
            iniciarApp()
        }, 3000);
    }, 2200);

}

function resetearFormulario() {
    formulario.reset()
    limpiarErrores()
}

function limpiarErrores() {
    const error = document.querySelector("p.error"); // accedo al parrafo que tenga la clase error
    if (error) {
        error.remove();
    } // elimino el parrafo en cuestion

}