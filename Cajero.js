alert("¡Atencion! Este cajero solo tiene billetes de 50, 20 y 10 dolares");

let valorEnCaja = document.getElementById("valores");
let d = document.getElementById("dinero");
let b = document.getElementById("extraer");
b.addEventListener("click", extraer);
let resultado = document.getElementById("resultado");

imagenes = [];
imagenes["50"] = "./images/50.png";
imagenes["20"] = "./images/20.png";
imagenes["10"] = "./images/10.png";

class billete{
    constructor(v, c){
        this.valor = v;
        this.cantidad = c;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor];
    }
}

let caja = [];
let entregado = [];
caja.push(new billete(50, 10));
caja.push(new billete(20, 30));
caja.push(new billete(10, 10));


let total = 0, totalE = 0;

function contarCaja(){
    total = 0;
    for (var t of caja){
        total += (t.valor * t.cantidad);
    }
    console.log("El dinero en caja es de $" + total);
}

function contarEntregado() {
    totalE = 0;
    for (var t of entregado){
        totalE += (t.valor * t.cantidad);
    }
    console.log("Se entrego $" + totalE);
}

contarCaja();
valorEnCaja.innerHTML = "Dinero disponible: <strong>$" + total + "<strong/>";

function extraer() {
    let dinero;
    let div = 0;
    let billetes = 0;
    if (total == 0){
        alert("El cajero automatico ya no tiene dinero");
    }
    else{
        dinero = parseInt(d.value);
        if (dinero <= total){
            for (var b of caja){
                if (dinero > 0) {
                    div = Math.floor(dinero / b.valor);
                    if (div > b.cantidad) {
                        billetes = b.cantidad;
                    }
                    else{
                        billetes = div;
                    }
                    dinero = dinero - (b.valor * billetes);
                    entregado.push(new billete(b.valor, billetes));
                    b.cantidad = b.cantidad - billetes;
                }
                console.log(b.cantidad);
            }
            if (dinero > 0){
                alert("No tengo los billetes necesarios para darte esa cantidad. Intenta con otro valor");
            }
            else{
                for (var e of entregado){
                    if (e.cantidad > 0){
                        for (var i = 0; i < e.cantidad; i++){
                            resultado.innerHTML += "<img src=" + e.imagen.src + " />";
                        }
                    }
                }
                console.log(entregado);
                resultado.innerHTML += "<hr>";
                contarEntregado();
                total = total - totalE
                console.log("El dinero en caja es de $" + total);
                valorEnCaja.innerHTML = "Dinero disponible: <strong>$" + total + "<strong/>";
            }
        }
        else{
            alert("No puedo darte una cantidad mayor a la disponible");
        }
        contarCaja();
    }
    entregado = [];
}