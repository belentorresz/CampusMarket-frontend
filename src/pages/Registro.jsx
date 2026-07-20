import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../styles/forms.css";
import "../styles/buttons.css";
import "../styles/auth.css";

import Notificacion from "../components/Notificacion";


function Registro(){


    const navigate = useNavigate();


    const [notificacion,setNotificacion] = useState(null);

    const [errores,setErrores] = useState({});



    const [formulario,setFormulario] = useState({

        nombre:"",
        correo:"",
        dni:"",
        codigo:"",
        facultad:"",
        password:""

    });





    const cambiar=(e)=>{


        setFormulario({

            ...formulario,

            [e.target.name]: e.target.value

        });


    };







    const validar = ()=>{


        let nuevosErrores = {};



        if(!formulario.nombre.trim()){

            nuevosErrores.nombre =
            "El nombre es obligatorio";

        }



        if(!formulario.correo.trim()){

            nuevosErrores.correo =
            "Ingrese un correo";

        }
        else if(
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(formulario.correo)
        ){

            nuevosErrores.correo =
            "Ingrese un correo válido";

        }



        if(!/^[0-9]{8}$/.test(formulario.dni)){

            nuevosErrores.dni =
            "El DNI debe tener 8 dígitos";

        }




        if(!formulario.codigo.trim()){

            nuevosErrores.codigo =
            "Ingrese su código universitario";

        }





        const password =
        formulario.password;



        if(password.length < 8){

            nuevosErrores.password =
            "Mínimo 8 caracteres";

        }
        else if(!/[A-Z]/.test(password)){

            nuevosErrores.password =
            "Debe tener una mayúscula";

        }
        else if(!/[a-z]/.test(password)){

            nuevosErrores.password =
            "Debe tener una minúscula";

        }
        else if(!/[0-9]/.test(password)){

            nuevosErrores.password =
            "Debe tener un número";

        }
        else if(!/[@$!%*?&]/.test(password)){

            nuevosErrores.password =
            "Debe tener un carácter especial @$!%*?&";

        }



        setErrores(nuevosErrores);



        return Object.keys(nuevosErrores).length === 0;


    };








    const registrar = async(e)=>{


        e.preventDefault();



        if(!validar()){

            return;

        }



        try{


            await api.post(

                "/auth/register",

                formulario

            );



            setNotificacion(
                "Registro exitoso"
            );



            setTimeout(()=>{

                navigate("/login");

            },1500);



        }catch(error){

            console.log(error.response);


            const mensaje =
            error.response?.data?.mensaje ||
            error.response?.data ||
            "Error al registrar";


            if(mensaje.toLowerCase().includes("correo")){

                setErrores({

                    correo: mensaje

                });

            }
            else{

                setNotificacion(mensaje);

            }


        }


    };









return(


<>


{
notificacion &&


<Notificacion

mensaje={notificacion}

tipo="success"

cerrar={()=>setNotificacion(null)}

/>

}





<div className="auth-page">


<div className="auth-card">



<div className="auth-logo">

</div>




<h2 className="auth-title">

Crear cuenta

</h2>





<form onSubmit={registrar}>


<div className="form-group">


<label>
Nombre completo
</label>


<input

className="form-control"

name="nombre"

value={formulario.nombre}

placeholder="Nombre completo"

onChange={cambiar}

/>


{
errores.nombre &&

<p className="mensaje-error">
{errores.nombre}
</p>

}


</div>






<div className="form-group">


<label>
Correo universitario
</label>


<input

className="form-control"

name="correo"

type="email"

value={formulario.correo}

placeholder="correo@universidad.com"

onChange={cambiar}

/>


{
errores.correo &&

<p className="mensaje-error">
{errores.correo}
</p>

}


</div>







<div className="form-group">


<label>
DNI
</label>


<input

className="form-control"

name="dni"

value={formulario.dni}

placeholder="8 dígitos"

maxLength="8"

onChange={cambiar}

/>


{
errores.dni &&

<p className="mensaje-error">
{errores.dni}
</p>

}


</div>







<div className="form-group">


<label>
Código universitario
</label>


<input

className="form-control"

name="codigo"

value={formulario.codigo}

placeholder="Código universitario"

onChange={cambiar}

/>


{
errores.codigo &&

<p className="mensaje-error">
{errores.codigo}
</p>

}


</div>







<div className="form-group">


<label>
Facultad
</label>


<input

className="form-control"

name="facultad"

value={formulario.facultad}

placeholder="Facultad"

onChange={cambiar}

/>


</div>








<div className="form-group">


<label>
Contraseña
</label>


<input

className="form-control"

name="password"

type="password"

value={formulario.password}

placeholder="Contraseña"

onChange={cambiar}

/>


{
errores.password &&

<p className="mensaje-error">
{errores.password}
</p>

}


</div>







<button

className="btn-primary btn-block"

>

Registrarse

</button>




</form>







<div className="auth-footer">


¿Ya tienes cuenta?


<button

onClick={()=>navigate("/login")}

>

Ingresar

</button>



</div>





</div>


</div>



</>


);


}


export default Registro;