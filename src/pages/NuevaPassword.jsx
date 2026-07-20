import {
    useState
} from "react";

import api from "../api/axios";

import "../styles/forms.css";
import "../styles/buttons.css";


function NuevaPassword(){


    const [correo,setCorreo] = useState("");

    const [codigo,setCodigo] = useState("");

    const [password,setPassword] = useState("");



    const cambiarPassword = async()=>{


        try{


            const respuesta = await api.post(
                "/auth/cambiar-password",
                {

                    correo,

                    codigo,

                    password

                }
            );



            alert(
                respuesta.data
            );


            window.location.href="/login";



        }catch(error){


            console.log(error);


            alert(
                error.response?.data ||
                "No se pudo cambiar la contraseña"
            );


        }


    };




return(


<div className="form-page">


<div className="form-card">


<h1>
Nueva contraseña
</h1>



<div className="form-group">

<label>
Correo
</label>

<input

className="form-control"

value={correo}

onChange={
e=>setCorreo(e.target.value)
}

/>

</div>




<div className="form-group">

<label>
Código de recuperación
</label>


<input

className="form-control"

value={codigo}

onChange={
e=>setCodigo(e.target.value)
}

/>

</div>




<div className="form-group">


<label>
Nueva contraseña
</label>


<input

type="password"

className="form-control"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>


</div>





<button

className="btn-primary"

onClick={cambiarPassword}

>

Cambiar contraseña

</button>



</div>


</div>


);


}


export default NuevaPassword;