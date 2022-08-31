const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"; //Guardo el url en una constante
let ArregloDeProductos = []; //Creo un arreglo vacio para guardar los productos del Json mas adelante

fetch(url) //Descargo la informacion de la url
.then(function(resultadoDelJson){ 
    return resultadoDelJson.json() //Hace la coneccion con el servidos y le decimos que queremos que devuelva un objeto del tipo Json
})
.then(function(respuestaJson){ //Aqui devuelve los datos del Json
    ArregloDeProductos = respuestaJson.products; //Guardo los productos con sus datos en el arreglo vacio
     //Creo una variable y alli con el DOM traigo el div donde quiero guardar los datos del Json
    let htmlParaAgregar = " "; //Creo una variable html donde voy a guardar los datos de cada producto para luego agregarlos al HTML con inner
    console.log(ArregloDeProductos) //Para ver en la consola los elemenos de mi array
    for (let i = 0; i < ArregloDeProductos.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
        htmlParaAgregar = `
        <div onclick="setCatID(${ArregloDeProductos[i].id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">       
            <div class="col-3">
                <img src="${ArregloDeProductos[i].image}" alt="${ArregloDeProductos[i].description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${ArregloDeProductos[i].name+" - USD "+ArregloDeProductos[i].cost}</h4>
                    <small class="text-muted">${ArregloDeProductos[i].soldCount} artículos</small>
                </div>
                <p class="mb-1">${ArregloDeProductos[i].description}</p>
            </div>
        </div>
    </div>
    `;
    let ListaProductosEnHTML = document.getElementById("container").innerHTML += htmlParaAgregar; // Creo una variable y agrego todos los datos de cada elemento del arreglo al documento HTML en el div con id container
    }
    });