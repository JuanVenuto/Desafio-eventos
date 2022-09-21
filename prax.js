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

const arrayDeCursos = [curso1, curso2, curso3, curso4, curso5, curso6, curso7, curso8]





function crearProductos(){
    let productos = document.getElementById("cursosDestacados")
    productos.innerHTML=""
    arrayDeCursos.forEach(element =>{
    let nuevosProductos = document.createElement("div")
    nuevosProductos.innerHTML = `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${element.nombre}</h5>
      <h6 class="card-subtitle mb-2 text-muted">$ ${element.precio}</h6>
      <p class="card-text">La duración del curso es de ${element.duracion}. <br> Tutor/a: ${element.nombreProfesor} ${element.apellido}</p>
      <p class="card-text">Número de contacto: ${element.numero}. <br> Mail de contacto: ${element.mail} <br> Código de alta: ${element.codigo}</p>
      <button id="btn${+element.id}" class="card-link">Agregar al carrito</button>
    </div>
    </div>`
    productos.appendChild(nuevosProductos)
})
}
crearProductos()





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
    crearProductos()
}




//CARRITO


let carrito = document.getElementsByClassName("card-link") 
const arrayDeCarrito = [] 


arrayDeCursos.forEach((e)=>{
    let tester = document.getElementById(`btn${e.id}`)
    tester.addEventListener("click", ()=>{
        alert("Producto agregado al carrito")
        arrayDeCarrito.push(e)
    })
})



//BOTON GUARDAR

let guardar = document.getElementById("guardar") 

if(guardar != null){
    guardar.addEventListener("click", ()=>{
        guardarInfoInput()
    })
}





