import { useState } from "react";
import api from "../api/axios";

import "../styles/forms.css";
import "../styles/buttons.css";


function RecuperarPassword(){


    const [correo,setCorreo] = useState("");

    const [mensaje,setMensaje] = useState("");

    const [tipoMensaje,setTipoMensaje] = useState("");





    const validarCorreo = (correo)=>{


        const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        return expresion.test(correo);


    };







    const enviar = async()=>{


        setMensaje("");



        if(!correo.trim()){


            setMensaje(
                "Ingrese su correo"
            );


            setTipoMensaje("error");


            return;

        }




        if(!validarCorreo(correo)){


            setMensaje(
                "Ingrese un correo válido"
            );


            setTipoMensaje("error");


            return;

        }





        try{


            const respuesta = await api.post(

                "/auth/recuperar",

                {
                    correo
                }

            );



            setMensaje(

                respuesta.data

            );



            setTipoMensaje("success");



        }catch(error){



            setMensaje(

                error.response?.data ||

                "El correo no existe"

            );



            setTipoMensaje("error");



        }



    };







return(


<div className="form-page">


<div className="form-card">



<h1 className="form-title">

Recuperar contraseña

</h1>





<div className="form-group">


<label>

Correo registrado

</label>



<input


className="form-control"


type="email"


placeholder="correo@gmail.com"


value={correo}



onChange={
e=>setCorreo(e.target.value)
}



/>



</div>






<button


className="btn-primary"


onClick={enviar}


>

Enviar código

</button>






{
mensaje &&


<p

className={
    tipoMensaje === "error"
    ?
    "mensaje-error"
    :
    "mensaje-success"
}

>

{mensaje}

</p>


}





</div>


</div>


);



}


export default RecuperarPassword;