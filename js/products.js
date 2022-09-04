const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`; //Guardo el url en una constante
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

    let ArregloFiltrado = []
    let minimo = undefined
    let maximo = undefined
   
    
    function MostrarFiltrados(){
        let htmlContentToAppend = "";
        for(let i = 0; i < ArregloDeProductos.length; i++){
            let products = ArregloDeProductos[i];
            console.log("ArregloDeProductos")
            minimo = document.getElementById("minimo").value
            maximo = document.getElementById("maximo").value
    
            if (products.cost >= minimo && products.cost <= maximo){
                htmlContentToAppend += `
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
            }
    
            document.getElementById("container").innerHTML = htmlContentToAppend;
        }
    }
    
    document.getElementById("rangeFilterCount").addEventListener("click", MostrarFiltrados)
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("minimo").value = undefined
        document.getElementById("maximo").value = undefined
        let htmlParaAgregar = ""
        for (let i = 0; i < ArregloDeProductos.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
            htmlParaAgregar += `
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
        }
        document.getElementById("container").innerHTML = htmlParaAgregar; // Creo una variable y agrego todos los datos de cada elemento del arreglo al documento HTML en el div con id container
        }); 
        
     document.getElementById("ascendente").addEventListener("click", function(){  
        let htmlParaAgregar = ""
        let Ascendente = ArregloDeProductos.sort ((a, b) => {
            if (a.cost < b.cost){
                return 1
            } else if (a.cost > b.cost){
                return -1
            } else {
                return -0
            }
        })
        console.log(Ascendente);
        for (let i = 0; i < Ascendente.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
            htmlParaAgregar += `
            <div onclick="setCatID(${Ascendente[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">       
                <div class="col-3">
                    <img src="${Ascendente[i].image}" alt="${Ascendente[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${Ascendente[i].name+" - USD "+Ascendente[i].cost}</h4>
                        <small class="text-muted">${Ascendente[i].soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${Ascendente[i].description}</p>
                </div>
            </div>
        </div>
        `;
        document.getElementById("container").innerHTML = htmlParaAgregar;
        }
    })

    document.getElementById("descendente").addEventListener("click", function(){  
        let htmlParaAgregar = ""
        let Descendente = ArregloDeProductos.sort ((a, b) => {
            if (a.cost > b.cost){
                return 1
            } else if (a.cost < b.cost){
                return -1
            } else {
                return -0
            }
        })
        console.log(Descendente);
        for (let i = 0; i < Descendente.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
            htmlParaAgregar += `
            <div onclick="setCatID(${Descendente[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">       
                <div class="col-3">
                    <img src="${Descendente[i].image}" alt="${Descendente[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${Descendente[i].name+" - USD "+Descendente[i].cost}</h4>
                        <small class="text-muted">${Descendente[i].soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${Descendente[i].description}</p>
                </div>
            </div>
        </div>
        `;
        document.getElementById("container").innerHTML = htmlParaAgregar;
        }
    })

    document.getElementById("stock").addEventListener("click", function(){  
        let htmlParaAgregar = ""
        let Stock = ArregloDeProductos.sort ((a, b) => {
            if (a.soldCount < b.soldCount){
                return 1
            } else if (a.soldCount > b.soldCount){
                return -1
            } else {
                return -0
            }
        })
        console.log(Stock);
        for (let i = 0; i < Stock.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
            htmlParaAgregar += `
            <div onclick="setCatID(${Stock[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">       
                <div class="col-3">
                    <img src="${Stock[i].image}" alt="${Stock[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${Stock[i].name+" - USD "+Stock[i].cost}</h4>
                        <small class="text-muted">${Stock[i].soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${Stock[i].description}</p>
                </div>
            </div>
        </div>
        `;
        document.getElementById("container").innerHTML = htmlParaAgregar;
        }
    })