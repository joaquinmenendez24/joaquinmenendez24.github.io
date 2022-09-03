function showAlertError() { //Funcion para cuando se ingresen los datos mal
    document.getElementById("alert-danger").classList.add("show");
}

let correo = ""
function hayCamposVacios() { //Funcion que corrobora si hay o no datos vacios
    correo = document.getElementById("correo").value
    contra = document.getElementById("contra").value

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
        document.getElementById("usuariomostrar").innerHTML(correo)
        return true;
    }
}

document.getElementById("regBtn").addEventListener("click", validarFormulario); //Aqui creamos un evento click que al hacer click en el botn al que llamamos por su ID, utilize la funcion que muerta las alertas
