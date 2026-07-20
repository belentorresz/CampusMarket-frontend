const foto=document.getElementById("foto");
const preview=document.getElementById("preview");

foto.addEventListener("change",function(){

    const archivo=this.files[0];

    if(!archivo) return;

    preview.src=URL.createObjectURL(archivo);

});

const mostrar=document.getElementById("mostrar");

mostrar.addEventListener("change",()=>{

    const tipo=mostrar.checked?"text":"password";

    document.getElementById("password").type=tipo;

    document.getElementById("confirmar").type=tipo;

});

document.getElementById("registerForm").addEventListener("submit",function(e){

    e.preventDefault();

    const correo=document.getElementById("correo").value;

    const dni=document.getElementById("dni").value;

    const password=document.getElementById("password").value;

    const confirmar=document.getElementById("confirmar").value;

    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(correo)){

        alert("Correo no válido");

        return;

    }

    if(dni.length!=8){

        alert("El DNI debe tener 8 dígitos.");

        return;

    }

    if(password!=confirmar){

        alert("Las contraseñas no coinciden.");

        return;

    }

    alert("Backend aún no conectado.");

});