const urlCart = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let cart = []

fetch(urlCart) //Comienzo la peiticion de la informacion a la url
.then(function(urlResult){ //Hace la coneccion con el servidor y le decimos que transforme la informacion en un tipo Json
    return urlResult.json() 
})
.then(function(jsonResult){ //Aqui devuelve los datos obtenidos de la url luego de pasarlos a tipo Json
    cart = jsonResult;
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
                <td><input type="number" id="input" value="${cart.articles[0].count}" style="width: 50px;"></input></td>
                <td><b id="subtotal"></b></td>
            </tr>
        </tbody>
    </table>
    <hr>
        `
    document.getElementById("userCart").innerHTML += htmlToAppend
    input = document.getElementById("input");
    let subtotal = document.getElementById("subtotal");
    let subtotal2 = document.getElementById("subtotal2")
    let total = document.getElementById("total");
    let costoenvio = document.getElementById("costoenvio");
    
    input.addEventListener("input",function(){
        subtotal.innerHTML = cart.articles[0].currency + " " + input.value * cart.articles[0].unitCost
        subtotal2.innerHTML = input.value * cart.articles[0].unitCost

    document.getElementById('option1').addEventListener('click', function() {
        costoenvio.innerHTML = cart.articles[0].currency + " " + ((input.value *  cart.articles[0].unitCost)*0.15)
        total.innerHTML = cart.articles[0].currency + " " + ((input.value *  cart.articles[0].unitCost) + ((input.value *  cart.articles[0].unitCost)*0.15))
    })
    
    document.getElementById('option2').addEventListener('click', function() {
        costoenvio.innerHTML = cart.articles[0].currency + " " + ((input.value *  cart.articles[0].unitCost)*0.07)
        total.innerHTML = cart.articles[0].currency + " " + ((input.value *  cart.articles[0].unitCost) + ((input.value *  cart.articles[0].unitCost)*0.07))
    })
    
    document.getElementById('option3').addEventListener('click', function() {
        costoenvio.innerHTML = cart.articles[0].currency + " " + ((input.value *  cart.articles[0].unitCost)*0.05)
        total.innerHTML = cart.articles[0].currency + " " + ((input.value *  cart.articles[0].unitCost) + ((input.value *  cart.articles[0].unitCost)*0.05))
    })
})


document.getElementById('tarjeta').addEventListener('click', function() {
    pago = document.getElementById("formadepago")
    document.getElementById('numtarjeta').disabled = false;
    document.getElementById('codseguridad').disabled = false;
    document.getElementById('vencimiento').disabled = false;
    document.getElementById('numcuenta').disabled = true;
    pago.innerHTML = "Tarjeta de Credito"
  });
  
document.getElementById('transferencia').addEventListener('click', function() {
    pago = document.getElementById("formadepago")
    document.getElementById('numtarjeta').disabled = true;
    document.getElementById('codseguridad').disabled = true;
    document.getElementById('vencimiento').disabled = true;
    document.getElementById('numcuenta').disabled = false;
    pago.innerHTML = "Transferencia bancaria"
  });
})

function cambioMoneda (){
    let valor = cart.articles[0].unitCost
    if (cart.articles[0].currency = "USD"){
        valor = cart.articles[0].unitCost / 40
        return valor
    } else {
        return valor
    }
}