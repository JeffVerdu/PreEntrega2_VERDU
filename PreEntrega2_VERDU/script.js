let productos = [ // Array de productos disponibles para venta
    { id:1, nombre: "papel couche", gramaje: "grueso 1" ,precio: 500, stock: 100 },
    { id:2, nombre: "papel bond", gramaje: "grueso 1" ,precio: 600, stock: 100 },
    { id:3, nombre: "papel fotografico", gramaje: "grueso 1" ,precio: 400, stock: 100 },
    { id:4, nombre: "papel reciclado", gramaje: "grueso 2" ,precio: 300, stock: 100 },
    { id:5, nombre: "papel de colores", gramaje: "grueso 2" ,precio: 350, stock: 100 },
    { id:6, nombre: "papel de diario", gramaje: "grueso 2" ,precio: 250, stock: 100 },
    { id:7, nombre: "papel de revista", gramaje: "grueso 3" ,precio: 450, stock: 100 },
    { id:8, nombre: "papel de oficina", gramaje: "grueso 3" ,precio: 550, stock: 100 },
    { id:9, nombre: "papel opalina", gramaje: "grueso 3" ,precio: 650, stock: 100 },
    { id:10, nombre: "cartulina", gramaje: "grueso 4" ,precio: 750, stock: 100 },
]

let carrito = [] //Array para almacenar los productos seleccionados

// Función para mostrar los productos disponibles para venta
function listarProductos() {
    let listaProductos = "  ID  |    NOMBRE    |   GRAMAJE   |   PRECIO   |   STOCK   \n"

    for (let producto of productos) {
        listaProductos += ` ${producto.id}     ${producto.nombre}       ${producto.gramaje}       $${producto.precio}      ${producto.stock} u/n\n`
    }

    alert(listaProductos)
}

//Función para filtrar productos por gramaje
function filtrarPorGramaje() {
    let gramaje
    
    do {
        gramaje = prompt("Ingrese el gramaje que desea (grueso 1/ grueso 2/ grueso 3/ grueso 4)")
        gramaje = gramaje.toLowerCase()
        if (gramaje !== "grueso 1" && gramaje !== "grueso 2" && gramaje !== "grueso 3" && gramaje !== "grueso 4") {
            alert("Gramaje inválido")
        }
        else {
            let productosFiltrados = productos.filter(producto => producto.gramaje === gramaje)
            let listaProductos = "  ID  |    NOMBRE    |   GRAMAJE   |   PRECIO   |   STOCK   \n"
            for (let producto of productosFiltrados) {
                    listaProductos += ` ${producto.id}     ${producto.nombre}       ${producto.gramaje}       $${producto.precio}      ${producto.stock} u/n\n`
            }

            alert(listaProductos)

            }

        } while (gramaje !== "grueso 1" && gramaje !== "grueso 2" && gramaje !== "grueso 3" && gramaje !== "grueso 4");
}

// Función para buscar productos por nombre
function buscarPorNombre() {
    let nombre = prompt("Ingrese el nombre del producto que desea: ")
    nombre = nombre.toLowerCase()
    let producto = productos.find(producto => producto.nombre === nombre)

    if (producto) {
        return producto
    }
    else {
        alert("No se encontró el producto")
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoAdd) {
    let cantidad 

    do {
        cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar: "))
        if (cantidad <= 0 || isNaN(cantidad)) {
            alert("Cantidad inválida")
        }

    } while (cantidad <= 0 || isNaN(cantidad))

    let pos = productos.findIndex(producto => producto.id === productoAdd.id)

    if (cantidad <= (productos[pos].stock)) {
        productos[pos].stock -= cantidad

        let carritoIndex = carrito.findIndex(item => item.nombre === productoAdd.nombre)

        if (carritoIndex !== (-1)) {
            carrito[carritoIndex].cantidad += cantidad;
        } 
        else {
            let productoCarrito = {
                nombre: productoAdd.nombre,
                precio: productoAdd.precio,
                gramaje: productoAdd.gramaje,
                cantidad: cantidad
            };

            carrito.push(productoCarrito);
        }

        alert(`Se agregaron ${cantidad} unidad(es) de ${productoAdd.nombre} al carrito`)
    } 
    else {
        alert(`No hay suficiente stock de ${productoAdd.nombre}`)
    }
}

// Función para mostrar el carrito
function listarCarrito() {
    let productosCarrito = "    NOMBRE    |   GRAMAJE   |   PRECIO   |   CANTIDAD   \n"

    if (carrito.length > 0) {
        for (let producto of carrito) {
            productosCarrito += `  ${producto.nombre}     ${producto.gramaje}      $${producto.precio}      ${producto.cantidad} u/n\n`
        }

        alert(productosCarrito)
    }
    else {
        alert("El carrito está vacío")
    }
}

// Función para eliminar productos del carrito por nombre
function eliminarDelCarritoPorNombre(nombre) {
    let producto = carrito.find(producto => producto.nombre === nombre)

    if (producto) {
        carrito = carrito.filter(producto => producto.nombre !== nombre)

        alert(`Se eliminó ${producto.nombre} del carrito`)

        productoIndex = productos.findIndex(item => item.nombre === nombre)
        productos[productoIndex].stock += producto.cantidad
    } 
    else {
        alert(`No se encontró el producto con nombre: ${nombre} en el carrito`)
    }
}

//Función para totalizar el carrito
function totalizarCarrito() {
    let total = 0

    for (let producto of carrito) {
        total += (producto.precio * producto.cantidad)
    }

    return total
}

//Función para vaciar el carrito
function vaciarCarrito() {
    for(let productoCarrito of carrito) {
        productoIndex = productos.findIndex(item => item.nombre === productoCarrito.nombre)
        productos[productoIndex].stock += productoCarrito.cantidad
    }

    carrito = []

    alert("Se vació el carrito")
}

// Menu Principal
function menuPrincipal() {
    let opcion

    do{
        opcion = parseInt(prompt(`Bienvenido a La Papeleria\n
        ¿Qué desea hacer?\n
        1. Listar productos disponibles\n
        2. Buscar producto por nombre\n
        3. Listar productos en carrito\n
        0. Salir`))

        if ( opcion == 1 ){
            listarProductos()

            let sel
            let producto

            do{
                sel = parseInt(prompt(`¿Qué desea hacer?\n
                1. Agregar un producto al carrito\n
                2.Filtrar productos por gramaje\n
                0. Volver`))

                if (sel == 1) {
                    producto = buscarPorNombre()
                    if (producto) agregarAlCarrito(producto)
                }
                else if (sel == 2) {
                    filtrarPorGramaje()
                }
                else if ((sel < 0 || sel > 2) || isNaN(sel)) {
                    alert("Opción inválida")
                }

            }while(sel != 0 || sel < 0 || sel > 2|| isNaN(sel))
        }
        else if ( opcion == 2 ){
            let producto = buscarPorNombre()

            if (producto) {
                let sel

                do{
                    sel = parseInt(prompt(`¿Qué desea hacer con ${producto.nombre}?\n
                    1. Agregar al carrito\n
                    2. Eliminar del carrito\n
                    0. Volver`))

                    if (sel == 1) {
                        agregarAlCarrito(producto)
                    }
                    else if (sel == 2) {
                        eliminarDelCarritoPorNombre(producto.nombre)
                        break
                    }
                    else if ((sel < 0 || sel >1) || isNaN(sel)) {
                        alert("Opción inválida")
                    }

                }while(sel != 0 || sel < 0 || sel > 1 || isNaN(sel))
            }
        }
        else if ( opcion == 3 ){
            listarCarrito()

            if (carrito.length > 0) {
                
                let sel
    
                do{
                    sel = parseInt(prompt(`¿Qué desea hacer?\n
                    1. Completa la compra\n
                    2. Vaciar el carrito\n
                    0. Volver`))
    
                    if (sel == 1) {
                        alert(`El total de la compra es: $${totalizarCarrito()}\n`)
                        alert("Gracias por su compra")
                        break
                    }
                    else if (sel == 2) {
                        vaciarCarrito()
                        break
                    }
                    else if ((sel < 0 || sel >2) || isNaN(sel)) {
                        alert("Opción inválida")
                    }
    
                }while(sel != 0 || sel < 0 || sel > 2 || isNaN(sel))
            }
        }
        else if ( (opcion < 0 || opcion > 3) || isNaN(opcion) ){
            alert("Opción inválida")
        }
        else if (opcion == 0) {
            alert("Gracias por visitar La Papeleria")
        }

    } while (opcion != 0 || opcion < 0 || opcion > 3 || isNaN(opcion))
}

menuPrincipal()