import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../styles/forms.css";
import "../styles/buttons.css";


function EditarPerfil(){

    const navigate = useNavigate();


    const [usuario,setUsuario] = useState(null);


    const [passwordActual,setPasswordActual] = useState("");

    const [nuevaPassword,setNuevaPassword] = useState("");

    const [confirmarPassword,setConfirmarPassword] = useState("");




    useEffect(()=>{

        const datos =
        JSON.parse(localStorage.getItem("usuario"));


        setUsuario(datos);


    },[]);





    const handleChange = (e)=>{


        setUsuario({

            ...usuario,

            [e.target.name]: e.target.value

        });


    };






    const guardarCambios = async()=>{


        try{


            await axios.put(

                `http://localhost:8080/api/usuarios/${usuario.id}`,

                usuario

            );



            localStorage.setItem(

                "usuario",

                JSON.stringify(usuario)

            );



            alert("Perfil actualizado");


            navigate("/perfil");



        }catch(error){


            console.log(error);

            alert(
                "Error actualizando perfil"
            );


        }


    };







    const cambiarPassword = async()=>{


        if(nuevaPassword !== confirmarPassword){


            alert(
                "Las contraseñas no coinciden"
            );


            return;

        }



        try{


            await api.put(

                "/usuarios/cambiar-password",

                {

                    usuarioId: usuario.id,

                    passwordActual,

                    nuevaPassword

                }

            );



            alert(
                "Contraseña actualizada"
            );



            setPasswordActual("");

            setNuevaPassword("");

            setConfirmarPassword("");



        }catch(error){


            console.log(error);


            alert(
                error.response?.data ||
                "No se pudo cambiar la contraseña"
            );


        }


    };







    if(!usuario){

        return <h2>Cargando...</h2>;

    }





return(


<div className="perfil-editar-page">


<div className="form-card">


<h1 className="form-title">
Editar Perfil
</h1>




<div className="form-group">

<label>
Nombre
</label>

<input

className="form-control"

name="nombre"

value={usuario.nombre || ""}

onChange={handleChange}

/>

</div>





<div className="form-group">

<label>
Correo
</label>

<input

className="form-control"

name="correo"

value={usuario.correo || ""}

onChange={handleChange}

/>

</div>






<div className="form-group">

<label>
DNI
</label>

<input

className="form-control"

name="dni"

value={usuario.dni || ""}

onChange={handleChange}

/>

</div>







<div className="form-group">

<label>
Código universitario
</label>

<input

className="form-control"

name="codigo"

value={usuario.codigo || ""}

onChange={handleChange}

/>

</div>







<div className="form-group">

<label>
Facultad
</label>

<input

className="form-control"

name="facultad"

value={usuario.facultad || ""}

onChange={handleChange}

/>

</div>






<div className="form-group">

<label>
Número de celular
</label>

<input

className="form-control"

name="numeroCelular"

value={usuario.numeroCelular || ""}

onChange={handleChange}

placeholder="987654321"

maxLength={9}

/>

</div>





<button

className="btn-primary"

onClick={guardarCambios}

>

Guardar cambios

</button>





<hr />



<h2>
Cambiar contraseña
</h2>




<div className="form-group">

<label>
Contraseña actual
</label>

<input

type="password"

className="form-control"

value={passwordActual}

onChange={
e=>setPasswordActual(e.target.value)
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

value={nuevaPassword}

onChange={
e=>setNuevaPassword(e.target.value)
}

/>

</div>







<div className="form-group">

<label>
Confirmar nueva contraseña
</label>

<input

type="password"

className="form-control"

value={confirmarPassword}

onChange={
e=>setConfirmarPassword(e.target.value)
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


export default EditarPerfil;