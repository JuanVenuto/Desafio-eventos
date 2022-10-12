function Curso (nombre, precio, duracion, nombreProfesor, apellido, numero, mail, codigo, id){
    this.nombre = nombre,
    this.precio = parseInt(precio),
    this.duracion = duracion,
    this.nombreProfesor = nombreProfesor,
    this.apellido = apellido,
    this.numero = parseInt(numero),
    this.mail = mail,
    this.codigo = parseInt(codigo),
    this.id = id
    this.aplicarComision = function (){
        this.precio = (this.precio * 0.05) + this.precio
    }
}



let arrayDeCursos = []


//UTILIZACION DEL JSON Y FETCH

const objetoCurso = async () =>{
    const respuesta = await fetch ("cursos.json")
    const cursos = await respuesta.json()
    cursos.aplicarComision()
}
objetoCurso()



localStorage.getItem("arrayDeCursos") ? arrayDeCursos = JSON.parse(localStorage.getItem("arrayDeCursos")) : arrayDeCursos.push(curso1, curso2, curso3, curso4, curso5, curso6, curso7, curso8), localStorage.setItem("arrayDeCursos", JSON.stringify(arrayDeCursos))




function crearProductos(array){
    let productos = document.getElementById("cursosDestacados")
    productos.innerHTML=""
    array.forEach(element =>{
    let nuevosProductos = document.createElement("div")
    nuevosProductos.innerHTML = `<div class="card text-center" style="width: 18rem;">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="true" >Curso</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Plan de estudio</a>
        </li>
      </ul>
    </div>
    <div class="card-body">
    <h5 class="card-title"> ${element.nombre}</h5>
    <h6  id="${element.precio < 10000 ? "precioMenorA10" : "precioMayorA10"}">$ ${element.precio}</h6>
    <p class="card-text"><i class="fa-solid fa-calendar-days"></i> Duración: ${element.duracion}. <br> Tutor/a: ${element.nombreProfesor} ${element.apellido}</p>
    <p class="card-text"><i class="fa-solid fa-phone"></i>  ${element.numero}. <br> <i class="fa-solid fa-envelope"></i> ${element.mail} <br> Código de alta: ${element.codigo}</p>
    <button id="btn${element.id}" class="card-link">Agregar al carrito</button>
    </div>
    </div>`
    productos.appendChild(nuevosProductos)

    let idProductos = document.getElementById(`btn${element.id}`)
    idProductos.addEventListener("click", ()=>{
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
crearProductos(arrayDeCursos)



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


if (guardar != null) {
    guardar.addEventListener("click", ()=>{ 
        guardarInfoInput() 
        Swal.fire({
            icon: 'success',
            title: '¡ Felicitaciones !',
            text: 'Ya puede encontrar su curso en la plataforma',
            showConfirmButton: false,
            timer: 4000,
            footer: '<a href="#tituloCurso">Buscar mi curso</a>'
        })
    })
}


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
        sumarPrecioTotal(array)
        Toastify({
            text: "Su producto fue eliminado del carrito",
            className: "info",
            style: {
              background: "linear-gradient(to right, #00416A, #1C2E4C)", 
              color: "#fff"
            }
          }).showToast();
    })
    })
    sumarPrecioTotal(array)
}


botonCarrito.addEventListener("click", ()=>{
    productosCargadosEnCarrito (arrayDeCarrito)
})



function sumarPrecioTotal(array){
    
    let acumulador = 0
    acumulador = array.reduce((acumulador,arrayDeCarrito)=>{
        return acumulador + arrayDeCarrito.precio
    },0)
    acumulador === 0 ? precioTotal.innerHTML = `No hay productos cargador en el carrito` : precioTotal.innerHTML = `El precio total es de ${acumulador} pesos`
}



//BUSCADOR


let buscarInput = document.getElementById("buscarInput")
let buscarBoton = document.getElementById("buscarBoton")

let {nombre} = Curso


function buscador(){
    
    buscarBoton.addEventListener("click",(e) =>{
        e.preventDefault()
        let valorInput = buscarInput.value.toLowerCase()
        let buscarCurso = arrayDeCursos.filter((x)=>
            x.nombre.toLowerCase() === valorInput
        )
        console.log(buscarCurso)
        crearProductos(buscarCurso)
    })
}


if(buscarBoton != null){
    buscador()
}

//Console para saber cuantos cursos hay y cuantos hay en carrito:

let cursosTotalYenCarrito = [...arrayDeCursos, ...arrayDeCarrito]
console.log(cursosTotalYenCarrito)