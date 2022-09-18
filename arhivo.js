class producto {
    constructor(nombre, precioTotal, cantidad) {
        this.nombre = nombre;
        this.precioTotal = precioTotal;
        this.cantidad = cantidad;
    }
}

class usuario {
    constructor(nombre, contraseña) {
        this.nombre = nombre;
        this.contraseña = contraseña;
    }
}
//------------------------------------------------------------------------------------------------------------------------
//eventos del main
let esUsuario = false;
let quitar = document.getElementById('quitar');
quitar.addEventListener('click', () => {
    quitarUltimoElemento()
})
let final = document.getElementById('precioFinal');
final.addEventListener('click', () => {
    precioFinal()
})
let itemsDelCarro = document.getElementById('itemsCarrito');
itemsDelCarro.addEventListener('click', ()=>{
    todosLosItemsDelCarro()
})
let itemMasCaro = document.getElementById('itemCaro');
itemMasCaro.addEventListener('click', () => {
    consultarItemMasCaro()
})
//------------------------------------------------------------------------------------------------------------------------
// funciones del main
//mostrar producos por pantalla y crear sus eventos
const mostrarProductos = document.getElementById("mostrarProductos");
fetch('https://6326367b70c3fa390f95cdd3.mockapi.io/productos')
.then((resp) => resp.json())
.then((data) =>{
    data.forEach((producto) => {
        const div = document.createElement('div');
        div.className = "col-3"
        div.innerHTML=`
        <img src="${producto.img}" class="img-fluid w-60"
            alt="${producto.nombre}">
        <button type="button" id="${producto.id}" class="btn btn-primary">${producto.nombre}, precio:
            $${producto.precio}</button>`
    mostrarProductos.append(div);
    });
})
.then(() =>{
    let compra1 = document.getElementById('compra1');
compra1.addEventListener('click', () => {
    agregarProducto(let = "rtx3060", let = 6000)
});
let compra2 = document.getElementById('compra2');
compra2.addEventListener('click', () => {
    agregarProducto(let = "rtx3090", let = 9500)
})
let compra3 = document.getElementById('compra3');
compra3.addEventListener('click', () => {
    agregarProducto(let = "motherboard", let = 12500)
})
let compra4 = document.getElementById('compra4');
compra4.addEventListener('click', () => {
    agregarProducto(let = "memoria-ram-8gb", let = 14500)
})
})
//------------------------------------------------------------------------------------------------------------------------
//crear carrito
const guardarObjeto = (clave, valor) => { sessionStorage.setItem(clave, valor) };
const listaDeProductos = JSON.parse(sessionStorage.getItem("listaDeProductos")) || [];
if(listaDeProductos != ""){
    for (const objeto of listaDeProductos) {
        Toastify({
            text: "usted esta llevando el porducto " + objeto.nombre + " y esta llevando " + objeto.cantidad + " unidades de esta producto",
            duration: 10000
        }).showToast();
}}
//-------------------------------------------------------------------------------------------------------------------------
//agregar productos
function agregarProducto(nombre, precio) {
    let noEstaEnLaLista = true;
    let cantidad = 1;
    for (const elemento of listaDeProductos) {
        if (elemento.nombre === nombre) {
            elemento.precioTotal = elemento.precioTotal + precio;
            elemento.cantidad++;
            noEstaEnLaLista = false;
            cantidad = elemento.cantidad;
            sessionStorage.removeItem("listaDeProductos");
            guardarObjeto("listaDeProductos", JSON.stringify(listaDeProductos));
            break;
        }
    }
    if (noEstaEnLaLista) {
        listaDeProductos.push(new producto(nombre, precio, 1));
        sessionStorage.removeItem("listaDeProductos");
        guardarObjeto("listaDeProductos", JSON.stringify(listaDeProductos));
    }
    Toastify({
        text: "usted a agregado el porducto " + nombre + " al carrito. Esta llevando " + cantidad + " unidades de esta producto",
        duration: 3000
    }).showToast();
}
//-------------------------------------------------------------------------------------------------------------------------
//consultar items del carro
function todosLosItemsDelCarro(){
    if(listaDeProductos.length === 0){
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'no tienes ningun producto en el carro',
        })
    }
    else{
        const textoDeLista = [];
        for(let i = 0; i < listaDeProductos.length; i++){
            let frase = ' usted esta llevando ' + listaDeProductos[i].cantidad + ' unidades del producto ' + listaDeProductos[i].nombre + ', en total ' + listaDeProductos[i].precioTotal + '$';
            textoDeLista.push(frase);
        }
        Swal.fire({
            icon: 'info',
            title: 'Precio final',
            text: textoDeLista,
        })
    }
}

//-------------------------------------------------------------------------------------------------------------------------
//precio final
function precioFinal() {
    if (listaDeProductos.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'no tienes ningun producto en el carro',
        })
    }
    else {
        let final = 0;
        for (let i = 0; i < listaDeProductos.length; i++) {
            final = final + listaDeProductos[i].precioTotal;
        }
        switch (true) {
            case listaDeProductos.length > 2 && esUsuario:
                final = final - (final * 30 / 100);
                final = final - (final * 5 / 100);
                Swal.fire({
                    icon: 'info',
                    title: 'Precio final',
                    text: 'el precio final de todos los productos es ' + parseInt(final) +  '$ con un 35% de descuento ya que usted esta llevando mas de dos productos distintos y es usuario',
                })
                break
            case listaDeProductos.length > 2 && esUsuario == false:
                final = final - (final * 30 / 100);
                Swal.fire({
                    icon: 'info',
                    title: 'Precio final',
                    text: 'el precio final de todos los productos es ' + parseInt(final) +  '$ con un 30% de descuento ya que usted esta llevando mas de dos productos',
                })
                break
            case listaDeProductos.length < 2 && esUsuario:
                final = final - (final * 5 / 100);
                Swal.fire({
                    icon: 'info',
                    title: 'Precio final',
                    text: 'el precio final de todos los productos es ' + parseInt(final) +  '$ con un 5% de descuento ya que usted es usuario',
                })
                break
            default:
                Swal.fire({
                    icon: 'info',
                    title: 'Precio final',
                    text: 'el precio final de todos los productos es ' + parseInt(final) + '$',
                })
                break
        }
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//quitar ultimo item
function quitarUltimoElemento() {
    if (listaDeProductos.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'no tienes ningun producto en el carro',
        })
    }
    else {
        Swal.fire({
            title: 'Esta seguro que quiere eliminar el ultimo producto del carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, seguro',
            cancelButtonText: 'No, no quiero'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'ELIMINADO',
                    icon: 'success',
                    text: 'usted elimino el item ' + listaDeProductos[listaDeProductos.length - 1].nombre + ' del carrito'
                })
                sessionStorage.removeItem("listaDeProductos");
                listaDeProductos.pop(listaDeProductos.length - 1);
                return  guardarObjeto("listaDeProductos", JSON.stringify(listaDeProductos));
            }
        })
    }
}
//-------------------------------------------------------------------------------------------------------------------------
//item mas caro


function consultarItemMasCaro() {
    if (listaDeProductos.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'no tienes ningun producto en el carro',
        })
    }
    else {
        let itemCaro = 0;
        let index = 0;
        for (let i = 0; i < listaDeProductos.length; i++) {
            if (listaDeProductos[i].precioTotal > itemCaro) {
                itemCaro = listaDeProductos[i].precioTotal;
                index = i;
            }
        }
        Swal.fire({
            icon: 'info',
            title: 'ITEM CARO',
            text: 'el item mas caro de su carrito es ' + listaDeProductos[index].nombre + ' con un precio de ' + listaDeProductos[index].precioTotal,
        })
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//log in
//crear lista de usuarios
const usuarios = JSON.parse(sessionStorage.getItem("listaDeUsuarios")) || [];
if(usuarios == ""){
    fetch('https://6326367b70c3fa390f95cdd3.mockapi.io/usuarios')
    .then((resp) => resp.json())
    .then((data) =>{
    data.forEach((producto) => {
        usuarios.push(new usuario(producto.nombre, producto.contraseña));
    });
    guardarObjeto("listaDeUsuarios", JSON.stringify(usuarios));
})
}
//-------------------------------------------------------------------------------------------------------------------------
//eventos del log in
let boton1 = document.getElementById("boton1");
boton1.addEventListener("click", () => {
    registrarUsuario(let = document.getElementById('nombreDeUsuario').value, let = document.getElementById('contrasenaDeUsuario').value, let = document.getElementById('confirmacion'))
});
let boton2 = document.getElementById("boton2");
boton2.addEventListener("click", () => {
    logearUsuario(let = document.getElementById('nombreDeUsuario').value, let = document.getElementById('contrasenaDeUsuario').value, let = document.getElementById('confirmacion'), let = document.getElementById('formulario'))
});
//-------------------------------------------------------------------------------------------------------------------------
//funciones de log in

function registrarUsuario(nombreDeUsuario, contraseñaDeUsuario, confirmacion) {
    switch (true) {
        case nombreDeUsuario === "":
            confirmacion.innerText = "no ingreso ningun nombre de usuario";
            break;
        case contraseñaDeUsuario === "":
            confirmacion.innerText = "no ingreso ninguna contraseña";
            break;
        default:
            let encontro = usuarios.find((el) => el.nombre === nombreDeUsuario)
            if (encontro) {
                confirmacion.innerText = "el nombre de usuario ya existe";
                break;
            }
            else {
                usuarios.push(new usuario(nombreDeUsuario, contraseñaDeUsuario));
                sessionStorage.removeItem("listaDeUsuarios");
                guardarObjeto("listaDeUsuarios", JSON.stringify(usuarios));
                confirmacion.innerText = "el usuario: " + nombreDeUsuario + " a sido registrado";
                break;
            }
    }
}

function logearUsuario(nombreDeUsuario, contraseñaDeUsuario, confirmacion, formulario) {
    let noEncontroUsuario = true;
    switch (true) {
        case nombreDeUsuario === "":
            confirmacion.innerText = "no ingreso ningun nombre de usuario";
            break;
        case contraseñaDeUsuario === "":
            confirmacion.innerText = "no ingreso ninguna contraseña";
            break;
        default:
            for (const elemento of usuarios) {
                switch (true) {
                    case elemento.nombre === nombreDeUsuario && elemento.contraseña != contraseñaDeUsuario:
                        confirmacion.innerText = "la contraseña ingresada es incorrecta";
                        noEncontroUsuario = false;
                        break;
                    case elemento.nombre === nombreDeUsuario && elemento.contraseña === contraseñaDeUsuario:
                        confirmacion.innerText = "bienvenido usuario: " + nombreDeUsuario + ", usted se a logeado existosamente";
                        formulario.remove();
                        noEncontroUsuario = false;
                        esUsuario = true;
                        break;
                    default:
                        continue;
                }
            }
            if (noEncontroUsuario) {
                confirmacion.innerText = "el nombre de usuario ingresado no existe";
            }
    }
}