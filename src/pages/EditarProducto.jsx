import {useEffect,useState} from "react";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom";
import "../styles/forms.css";
import "../styles/buttons.css";
import Notificacion from "../components/Notificacion";


function EditarProducto(){

    const {id}=useParams();

    const navigate=useNavigate();
    const [notificacion,setNotificacion] = useState(null);


    const [producto,setProducto]=useState(null);
    const [archivo,setArchivo] = useState(null);



    useEffect(()=>{


        axios.get(
            `http://localhost:8080/api/productos/${id}`
        )
        .then(res=>{

            setProducto(res.data);

        });


    },[id]);



    const cambiar=(e)=>{

        setProducto({

            ...producto,

            [e.target.name]:e.target.value

        });

    };



    const guardar=async()=>{


        await axios.put(

            `http://localhost:8080/api/productos/${id}`,

            producto

        );


        alert("Producto actualizado");


        navigate("/mis-productos");


    };

    const subirImagen = async()=>{


        if(!archivo){
            setNotificacion("Selecciona una imagen");
            return;
        }


        const formData = new FormData();


        formData.append(
            "archivo",
            archivo
        );


        try{

            await axios.post(

                `http://localhost:8080/api/productos/${id}/imagen`,

                formData,

                {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    }
                }

            );


            setNotificacion("Imagen actualizada");


            window.location.reload();


        }catch(error){

            console.log(error);

        }

    };



    if(!producto)
        return <h2>Cargando...</h2>



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

<div className="perfil-editar-page">

    <div className="form-card">

        <h1 className="form-title">
            Editar producto
        </h1>


        <div className="producto-preview">

            <img
                src={
                    producto.imagen
                    ? `http://localhost:8080/uploads/productos/${producto.imagen}`
                    : "https://via.placeholder.com/400"
                }
                alt={producto.nombre}
                className="producto-preview-img"
            />

        </div>



        <label className="foto-selector">

            Elegir imagen

            <input
                type="file"
                onChange={(e)=>setArchivo(e.target.files[0])}
            />

        </label>
        <button
            className="perfil-btn-primary"
            onClick={subirImagen}
        >
            Cambiar imagen
        </button>

        <div className="form-group">

            <label>Nombre</label>

            <input
                className="form-control"
                name="nombre"
                value={producto.nombre}
                onChange={cambiar}
            />

        </div>

        <div className="form-group">

            <label>Precio</label>

            <input
                className="form-control"
                name="precio"
                value={producto.precio}
                onChange={cambiar}
            />

        </div>

        <div className="form-group">

            <label>Descripción</label>

            <textarea
                className="form-control"
                name="descripcion"
                value={producto.descripcion}
                onChange={cambiar}
            />

        </div>


        <div className="form-group">

            <label>Condición</label>

            <input
                className="form-control"
                name="condicion"
                value={producto.condicion}
                onChange={cambiar}
            />

        </div>



        <button
            className="btn-primary"
            onClick={guardar}
        >
            Guardar cambios
        </button>

    </div>
    

</div>
</>
);

}


export default EditarProducto;