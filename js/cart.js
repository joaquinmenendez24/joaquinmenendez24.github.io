const urlCart = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

fetch(urlCart) //Comienzo la peiticion de la informacion a la url
.then(function(urlResult){ //Hace la coneccion con el servidor y le decimos que transforme la informacion en un tipo Json
    return urlResult.json() 
})
.then(function(jsonResult){ //Aqui devuelve los datos obtenidos de la url luego de pasarlos a tipo Json
    cart = jsonResult;
    console.log(cart)
    let input = `${cart.articles[0].count}`
    let htmlToAppend = `
    <div class="text-center p-4">
        <h2>Carrito de compras</h2>
    </div>
    <br>
    <h4>Articulos a comprar</h4>
    <table class="table">
        <thead>
            <tr>
                 <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row"><img src=${cart.articles[0].image} width="50px"></img></th>
                <td>${cart.articles[0].name}</td>
                <td>${cart.articles[0].currency + " " + cart.articles[0].unitCost}</td>
                <td><input type="number" id="input" value="${input}" style="width: 50px;"></input></td>
                <td><b id="subtotal"></b></td>
            </tr>
        </tbody>
    </table>
    <hr>
        `
    document.getElementById("userCart").innerHTML += htmlToAppend
    input = document.getElementById("input");
    let subtotal = document.getElementById("subtotal");
    input.addEventListener("input",function(){
        subtotal.innerHTML = cart.articles[0].currency + " " + input.value * cart.articles[0].unitCost
    })
})
