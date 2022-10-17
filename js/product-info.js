const urlProduct = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("prodID")}.json`; 
const urlComents = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("prodID")}.json`
let product =  [];
let coments = [];

fetch(urlProduct) //Comienzo la peiticion de la informacion a la url
.then(function(urlResult){ //Hace la coneccion con el servidor y le decimos que transforme la informacion en un tipo Json
    return urlResult.json() 
})
.then(function(jsonResult){ //Aqui devuelve los datos obtenidos de la url luego de pasarlos a tipo Json
    product = jsonResult;
    console.log(product)
        let htmlToAppend = `
        <br>
        <div>
        <h1 style="font-size:30px;">${product.name}</h1>
        </div>
        <p align="right"> <input type="button" id="buttonCart" value="Añadir al carrito" /></p>
        <hr>
        <div>
        <h2><b style="font-size:15px;">Precio</b></h2>
        <p>${product.description}</p>
        </div>
        <div>
        <h2><b style="font-size:15px;">Categoria</b></h2>
        <p>${product.category}</p>
        </div>
        <div>
        <h2><b style="font-size:15px;">Cantidad Vendidos</b></h2>
        <p>${product.soldCount}</p>
        </div>
        <h2><b style="font-size:15px;">Imagenes Ilustrativas</b></h2>
        `

        let imagenes = product.images 
            htmlToAppend += `
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${imagenes[0]}" width="150px" alt="">
                        </div>
                        <div class="carousel-item">
                            <img src="${imagenes[1]}" width="150px" alt="">
                        </div>
                        <div class="carousel-item">
                            <img src="${imagenes[2]}" width="150px" alt="">
                        </div>
                        <div class="carousel-item">
                            <img src="${imagenes[3]}" width="150px" alt="">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>	
            `
            
            ;
        
        let htmlToAppend2 = ""
        console.log(product.relatedProducts)
        for (let i = 0; i < product.relatedProducts.length; i++){
            htmlToAppend2 += `
            <div onclick="setRelID(${product.relatedProducts[i].id})">
            <img src=${product.relatedProducts[i].image} width="150px"></img>
            <p>${product.relatedProducts[i].name}</p>
            </div>
            `
        }
        console.log(htmlToAppend2)

    document.getElementById("product").innerHTML += htmlToAppend
    document.getElementById("prodRel").innerHTML += htmlToAppend2
    }
)

function setRelID(id) {  
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}
  

fetch(urlComents) //Comienzo la peiticion de la informacion a la url
.then(function(urlResult){ //Hace la coneccion con el servidor y le decimos que transforme la informacion en un tipo Json
    return urlResult.json() 
})
.then(function(jsonResult){ //Aqui devuelve los datos obtenidos de la url luego de pasarlos a tipo Json
    coments = jsonResult;
    let htmlToAppend = `
        <br>
        <br>
        <div>
        <h2><b style="font-size:20px;">Comentarios</b></h2>
        </div>
        `
    document.getElementById("product").innerHTML += htmlToAppend; 
    for (let i = 0; i < coments.length; i++){ 
        let htmlToAppend = `
        <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div class="row">
                <div class="col-5">
                <p><span class+"fw-bold">${coments[i].user}</span> - <small class="text-muted">${coments[i].dateTime}</small> - ${coments[i].score} </p>
                </div>
                <div class="row">
                    <div class="d-flex w-100 justify-contetn-between">
                    <p>${coments[i].description}</p>
                </div>
            </div>
        </li>
    `;
    document.getElementById("product").innerHTML += htmlToAppend; 
    }})
