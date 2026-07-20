import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "../../styles/perfil.css";


function Perfil(){

    const { usuario, logout } = useContext(AuthContext);
    console.log("USUARIO LOGIN:", usuario);

    const navigate = useNavigate();

    const [imagen,setImagen] = useState(null);



    const seleccionarImagen = (e)=>{

        setImagen(e.target.files[0]);

    };



    const subirFoto = async()=>{

        try{

            if(!imagen){

                alert("Seleccione una imagen");

                return;

            }


            const formData = new FormData();

            formData.append(
                "archivo",
                imagen
            );


            await api.post(
                `/usuarios/${usuario.id}/foto`,
                formData,
                {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }
            );


            alert("Foto actualizada");

            window.location.reload();


        }catch(error){

            console.log(error);

            alert("No se pudo subir la foto");

        }

    };



    if(!usuario){

        return <h2>Cargando...</h2>;

    }



return (

<div className="container mt-4">


<h1>
    Mi Perfil
</h1>



<div className="perfil-card">



<div className="perfil-layout">



{/* INFORMACIÓN USUARIO */}

<div className="perfil-info">

<div className="perfil-foto-area">

    {
        usuario.foto ?

        <img
            src={`https://campusmarket-production-98d0.up.railway.app/uploads/perfiles/${usuario.foto}`}
            alt="Perfil"
            className="perfil-imagen"
        />

        :

        <div className="perfil-imagen perfil-sin-foto">
            Sin foto
        </div>
    }

    <div className="foto-botones">

        <label className="btn-subir-foto">

            Elegir foto

            <input
                type="file"
                accept="image/*"
                onChange={seleccionarImagen}
            />

        </label>

        <button
            className="perfil-btn-primary"
            onClick={subirFoto}
        >
            Subir foto
        </button>

    </div>

</div>


<h2>

{usuario.nombre}

</h2>



<div className="perfil-datos">



<div className="dato-item">

<span>
Correo
</span>

<strong>
{usuario.correo}
</strong>

</div>




<div className="dato-item">

<span>
DNI
</span>

<strong>
{usuario.dni}
</strong>

</div>




<div className="dato-item">

<span>
Código universitario
</span>

<strong>
{usuario.codigo}
</strong>

</div>




<div className="dato-item">

<span>
Facultad
</span>

<strong>
{usuario.facultad}
</strong>

</div>




<div className="dato-item">

<span>
Número de celular
</span>

<strong>
{usuario.numeroCelular || "No registrado"}
</strong>

</div>



</div>


</div>





{/* MENU DERECHA */}

<div className="perfil-menu">



<button

className="perfil-option"

onClick={() => navigate("/mis-productos")}

>

📦 Mis publicaciones

</button>




<button

className="perfil-option"

onClick={() => navigate("/mis-compras")}

>

🛒 Mis compras

</button>




<button

className="perfil-option"

onClick={() => navigate("/mis-ventas")}

>

💰 Mis ventas

</button>




<button

className="perfil-option"

onClick={() => navigate("/favoritos")}

>

❤️ Favoritos

</button>



</div>



</div>





{/* ACCIONES CUENTA */}

<div className="perfil-account">


<button

className="perfil-btn-secondary"

onClick={()=>navigate("/editar-perfil")}

>

✏️ Editar perfil

</button>




<button

className="perfil-btn-danger"

onClick={()=>{

logout();

navigate("/");

}}

>

🚪 Cerrar sesión

</button>



</div>



</div>


</div>

);


}


export default Perfil;
