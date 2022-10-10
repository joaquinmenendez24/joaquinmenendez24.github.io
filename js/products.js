const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`; //Guardo el url a utilizar en la peticion en una constante con el agregado de que segun lo que el usuario quiere ver tome ese ID para descargar los datos
let ProductsArray = []; //Creo un arreglo vacio para guardar los datos (productos en este caso) que devuelva la peticion

fetch(url) //Comienzo la peiticion de la informacion a la url
.then(function(urlResult){  
    return urlResult.json() //Hace la coneccion con el servidor y le decimos que transforme la informacion en un tipo Json
})
.then(function(jsonResult){ //Aqui devuelve los datos obtenidos de la url luego de pasarlos a tipo Json
    ProductsArray = jsonResult.products; //Guardo la informacion obtenida (productos) en el arreglo vacio para poder trabajar con ellos
    console.log(ProductsArray)
    let htmlToAppend = ""; //Creo una variable html donde voy a guardar los datos de cada producto (con estilos) para luego agregarlos al HTML con inner
    for (let i = 0; i < ProductsArray.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
        htmlToAppend = `
        <div onclick="setProdID(${ProductsArray[i].id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">       
            <div class="col-3">
                <img src="${ProductsArray[i].image}" alt="${ProductsArray[i].description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${ProductsArray[i].name+" - USD "+ProductsArray[i].cost}</h4>
                    <small class="text-muted">${ProductsArray[i].soldCount} artículos</small>
                </div>
                <p class="mb-1">${ProductsArray[i].description}</p>
            </div>
        </div>
    </div>
    `;
    document.getElementById("container").innerHTML += htmlToAppend; // LLamo con DOM el div con ID=container y agrego todos los datos que recorrimos con el for
    }
    });

//Variables globales para ejercicio de filtrado
    let FilterArray = []
    let min = undefined
    let max = undefined

//Funcion para mostrar los filtrados segun rango de precio
    function MostrarFiltrados(){
        let htmlContentToAppend = "";
        for(let i = 0; i < ProductsArray.length; i++){
            let products = ProductsArray[i];
            console.log("ArregloDeProductos")
            min = document.getElementById("minimo").value
            max = document.getElementById("maximo").value
    
            if (products.cost >= min && products.cost <= max){
                htmlContentToAppend += `
                <div onclick="setCatID(${ProductsArray[i].id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">       
                    <div class="col-3">
                        <img src="${ProductsArray[i].image}" alt="${ProductsArray[i].description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${ProductsArray[i].name+" - USD "+ProductsArray[i].cost}</h4>
                            <small class="text-muted">${ProductsArray[i].soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${ProductsArray[i].description}</p>
                    </div>
                </div>
            </div>
            `;
            }
    
            document.getElementById("container").innerHTML = htmlContentToAppend;
        }
    }
    document.getElementById("rangeFilterCount").addEventListener("click", MostrarFiltrados)
    
//Funcion para limpiar los rangos de precio
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("minimo").value = undefined
        document.getElementById("maximo").value = undefined
        let htmlToAppend = ""
        for (let i = 0; i < ProductsArray.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
            htmlToAppend += `
            <div onclick="setCatID(${ProductsArray[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">       
                <div class="col-3">
                    <img src="${ProductsArray[i].image}" alt="${ProductsArray[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${ProductsArray[i].name+" - USD "+ProductsArray[i].cost}</h4>
                        <small class="text-muted">${ProductsArray[i].soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${ProductsArray[i].description}</p>
                </div>
            </div>
        </div>
        `;
        }
        document.getElementById("container").innerHTML = htmlToAppend; 
        }); 
//Funcion para ordenar de mayor a menor precio
     document.getElementById("ascendente").addEventListener("click", function(){  
        let htmlToAppend = ""
        let Ascendente = ProductsArray.sort ((a, b) => {
            if (a.cost < b.cost){
                return 1
            } else if (a.cost > b.cost){
                return -1
            } else {
                return -0
            }
        })
        for (let i = 0; i < Ascendente.length; i++){ 
            htmlToAppend += `
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
        document.getElementById("container").innerHTML = htmlToAppend;
        }
    })
//Funcion para ordenar de menor a mayor precio
    document.getElementById("descendente").addEventListener("click", function(){  
        let htmlToAppend = ""
        let Descendente = ProductsArray.sort ((a, b) => {
            if (a.cost > b.cost){
                return 1
            } else if (a.cost < b.cost){
                return -1
            } else {
                return -0
            }
        })
        for (let i = 0; i < Descendente.length; i++){ 
            htmlToAppend += `
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
        document.getElementById("container").innerHTML = htmlToAppend;
        }
    })
//Funcion para ordenar segun articulos en stock
    document.getElementById("stock").addEventListener("click", function(){  
        let htmlToAppend = ""
        let Stock = ProductsArray.sort ((a, b) => {
            if (a.soldCount < b.soldCount){
                return 1
            } else if (a.soldCount > b.soldCount){
                return -1
            } else {
                return -0
            }
        })
        for (let i = 0; i < Stock.length; i++){ //Hago un for para recorrer cada elemento del arreglo y asi guardar sus datos en la variable que cree
            htmlToAppend += `
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
        document.getElementById("container").innerHTML = htmlToAppend;
        }
    })

//Funcion para guardar el id de un producto en el local storage y redirigir a procut info html
function setProdID(id) {  
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}