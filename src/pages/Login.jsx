import { useState,useContext } from "react";
import api from "../api/axios";
import {AuthContext} from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";
import "../styles/forms.css";
import "../styles/buttons.css";
import "../styles/auth.css";


function Login(){


const navigate = useNavigate();


const {login}=useContext(AuthContext);
const [notificacion,setNotificacion] = useState(null);

const [datos,setDatos]=useState({

    correo:"",
    password:""

});



const cambiar=(e)=>{

setDatos({

...datos,

[e.target.name]:e.target.value

});

};



const enviar=async(e)=>{

e.preventDefault();


try{


const respuesta =
await api.post(
"/auth/login",
datos
);



login(respuesta.data);


navigate("/");



}catch(error){


alert(
"Credenciales incorrectas"
);


}



};



return(

<div className="auth-page">


<div className="auth-card">



<div className="auth-logo">

</div>




<h2 className="auth-title">

Iniciar sesión

</h2>




<form onSubmit={enviar}>


<div className="form-group">

<label>
Correo
</label>


<input

className="form-control"

name="correo"

type="email"

placeholder="Correo universitario"

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

placeholder="Contraseña"

onChange={cambiar}

/>

</div>




<button

className="btn-primary btn-block"

>

Ingresar

</button>



</form>




<div className="auth-footer">


<div className="registro-link">

    ¿No tienes cuenta?

    <button
    onClick={()=>navigate("/registro")}
    >
        Crear cuenta
    </button>

</div>



<Link 
className="recuperar-link"
to="/recuperar-password"
>
    ¿Olvidaste tu contraseña?
</Link>


</div>



</div>


</div>

)

}


export default Login;