function showAlertError() { //Funcion para cuando se ingresen los datos mal
    document.getElementById("alert-danger").classList.add("show");
}

let correo = []

function hayCamposVacios() { //Funcion que corrobora si hay o no datos vacios
    correo = document.getElementById("correo").value //Trae el valor ingresado en el input con id correo y lo guarda en una variable
    contra = document.getElementById("contra").value //Trae el valor ingresado en el input con id contra y lo guarda en una variable

    if (!correo || !contra) {
        return true;
    } else {
        return false;
    }
}

function validarFormulario() { //Funcion que valida el formulario y muertas las alertas segun si hay datos vacios o no
    if (hayCamposVacios()) {
        showAlertError();
        return false;
    } else {
        localStorage.setItem("usuario", JSON.stringify(correo)); //Guarda en el local storage lo ingresado e en el input con id correo
        return true;
    }
}

document.getElementById("regBtn").addEventListener("click", validarFormulario); //Aqui creamos un evento click que al hacer click en el botn al que llamamos por su ID, utilize la funcion que muerta las alertas
