function Curso (nombre, precio, duracion, nombreProfesor, apellido, numero, mail, codigo, id){
    this.nombre = nombre,
    this.precio = parseInt(precio),
    this.duracion = duracion,
    this.nombreProfesor = nombreProfesor,
    this.apellido = apellido,
    this.numero = parseInt(numero),
    this.mail = mail,
    this.codigo = parseInt(codigo)
    this.id = id
    this.aplicarComision = function (){
        this.precio = (this.precio * 0.05) + this.precio
    }
}



const curso1 = new Curso ("Marketing", 7000, "3 semanas", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 1)
const curso2 = new Curso ("Ingles", 8000, "4 semanas", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 2)
const curso3 = new Curso ("Community Manager", 6000, "2 semanas", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 3)
const curso4 = new Curso ("Frances", 10000, "2 meses", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 4)
const curso5 = new Curso ("Diseño gráfico", 15000, "3 meses", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 5)
const curso6 = new Curso ("Fundamentos de la economía", 6000, "2 semanas", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 6)
const curso7 = new Curso ("Programación", 20000, "4 meses", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 7)
const curso8 = new Curso ("Literatura", 7000, "2 meses", "Cristian", "Gonzales", 2235602627, "judjkfndl@gmail.com", 45648, 8)


curso1.aplicarComision()
curso2.aplicarComision()
curso3.aplicarComision()
curso4.aplicarComision()
curso5.aplicarComision()
curso6.aplicarComision()
curso7.aplicarComision()
curso8.aplicarComision()

let arrayDeCursos = []


localStorage.getItem("arrayDeCursos") = true ? arrayDeCursos = JSON.parse(localStorage.getItem("arrayDeCursos")) 
: arrayDeCursos.push(curso1, curso2, curso3, curso4, curso5, curso6, curso7, curso8), localStorage.setItem("arrayDeCursos", JSON.stringify(arrayDeCursos))


console.log(arrayDeCursos)




function crearProductos(array){
    let productos = document.getElementById("cursosDestacados")
    productos.innerHTML=""
    array.forEach(element =>{
    let nuevosProductos = document.createElement("div")
    nuevosProductos.innerHTML = `<div class="card" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${element.nombre}</h5>
        <h6  id="${element.precio < 10000 ? "precioMenorA10" : "precioMayorA10"}">$ ${element.precio}</h6>
        <p class="card-text">La duración del curso es de ${element.duracion}. <br> Tutor/a: ${element.nombreProfesor} ${element.apellido}</p>
        <p class="card-text">Número de contacto: ${element.numero}. <br> Mail de contacto: ${element.mail} <br> Código de alta: ${element.codigo}</p>
        <button id="btn${element.id}" class="card-link">Agregar al carrito</button>
        </div>
        </div>`
    productos.appendChild(nuevosProductos)

    let idProductos = document.getElementById(`btn${element.id}`)
    idProductos.addEventListener("click", ()=>{
        //alert("Producto agregado al carrito")
        Swal.fire({
            icon: 'success',
            title: 'Tu curso fue agregado al Carrito',
            showConfirmButton: false,
            timer: 1800
        })
        agregarAlCarrito(element)
    })
    })
}
crearProductos(...arrayDeCursos)



//FORMULARIO empresas

function guardarInfoInput (){ 
    let inputCurso = document.getElementById("inputCurso")
    let inputPrecio = document.getElementById("inputPrecio")
    let inputDuracion = document.getElementById("inputDuracion")
    let inputNombre = document.getElementById("inputNombre")
    let inputApellido = document.getElementById("inputApellido")
    let inputNumero = document.getElementById("inputNumero")
    let inputMail = document.getElementById("inputMail")
    let inputCodigo = document.getElementById("inputCodigo")
    let infoIngresada = new Curso (inputCurso.value, inputPrecio.value, inputDuracion.value, inputNombre.value, inputApellido.value, inputNumero.value, inputMail.value, inputCodigo.value)
    infoIngresada.aplicarComision()
    arrayDeCursos.push(infoIngresada)
    crearProductos(arrayDeCursos)

    localStorage.setItem("arrayDeCursos", JSON.stringify(arrayDeCursos))
    inputCurso.value=""
    inputPrecio.value=""
    inputDuracion.value=""
    inputNombre.value=""
    inputApellido.value=""
    inputNumero.value=""
    inputMail.value=""
    inputCodigo.value=""
    infoIngresada.value=""
}

//BOTON GUARDAR

let guardar = document.getElementById("guardar") 

guardar != null && guardar.addEventListener("click", ()=>{ guardarInfoInput() })


//CARRITO


let arrayDeCarrito = [] 


function agregarAlCarrito(element){
    arrayDeCarrito.push(element)
}


let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modalBody")
let botonFinalizarCompra = document.getElementById("finalizarCompra")
let precioTotal = document.getElementById("precioTotal")


function productosCargadosEnCarrito (array){
    modalBody.innerHTML=""
    array.forEach((producto)=>{
        let productosEnCarrito = document.createElement("div")
        productosEnCarrito.innerHTML =
        `<div class="card border-primary mb-3" style="max-width: 540px;">
        <div class="card-body">
                <h4 class="card-title">${producto.nombre}</h4>
                <p class="card-text">Precio: $${producto.precio}</p> 
                <p class="card-text">Duración: ${producto.duracion}</p>
                <button class= "btn btn-danger" id="botonEliminar${producto.id}"><i class="fas fa-trash-alt"></i></button>
        </div>    
        </div>`
    modalBody.appendChild(productosEnCarrito)

    let botonEliminar = document.getElementById(`botonEliminar${producto.id}`)
    botonEliminar.addEventListener("click", ()=>{
        productosEnCarrito.remove()
        arrayDeCarrito.splice(productosEnCarrito,1)
        console.log(arrayDeCarrito)
    })
    })
    sumarPrecioTotal(array)
}


botonCarrito.addEventListener("click", ()=>{
    productosCargadosEnCarrito (...arrayDeCarrito)
})



function sumarPrecioTotal(array){
    
    let acumulador = 0
    acumulador = array.reduce((acumulador,arrayDeCarrito)=>{
        return acumulador + arrayDeCarrito.precio
    },0)
    acumulador === 0 ? precioTotal.innerHTML = `<strong>No hay productos cargador en el carrito </strong>` : precioTotal.innerHTML = `El precio total es de ${acumulador} pesos`
}








//BUSCADOR


let buscarInput = document.getElementById("buscarInput")
let buscarBoton = document.getElementById("buscarBoton")

let {nombre} = Curso


function buscador(){
    
    buscarBoton.addEventListener("click",(e) =>{
        let valorInput = buscarInput.value.toLowerCase()
        let buscarCurso = arrayDeCursos.filter(()=>
            e.nombre.toLowerCase() === valorInput
        )
        console.log(buscarCurso)
        crearProductos(buscarCurso)
    })
}

buscarBoton != null && buscador()



//Console para saber cuantos cursos hay y cuantos hay en carrito:

let cursosTotalYenCarrito = [...arrayDeCursos, ...arrayDeCarrito]
console.log(cursosTotalYenCarrito)