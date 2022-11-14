let nombredeusuario = JSON.parse(localStorage.getItem("nombredeusuario"))
let apellidousuario = JSON.parse(localStorage.getItem("apellidousuario"))
let email = JSON.parse(localStorage.getItem("usuario"))

let inputNombredeusuario = document.getElementById("nombredeusuario")
let inputApellidousuario = document.getElementById("apellidousuario")
let inputEmail = document.getElementById("email")

let form = document.getElementById("perfil-info")

window.addEventListener("DOMContentLoaded",
    function (){
        if (nombredeusuario != ""){
            inputNombredeusuario.value = nombredeusuario
        }
        if (apellidousuario != ""){
            inputApellidousuario.value = apellidousuario
        }
        if (email != ""){
            inputEmail.value = email
        }
    }
)

form.addEventListener("submit", function(e){
    e.preventDefault()
    if(inputNombredeusuario.value != ""){
        let userName = []
        userName.push(inputNombredeusuario.value)
        localStorage.setItem("nombredeusuario", JSON.stringify(userName))
    }
    if(inputApellidousuario.value != ""){
        let userSurName = []
        userSurName.push(inputApellidousuario.value)
        localStorage.setItem("apellidousuario", JSON.stringify(userSurName))
    }
    if(inputEmail.value != ""){
        email = []
        email.push(inputEmail.value)
        localStorage.setItem("email", JSON.stringify(email))
    }
    })

