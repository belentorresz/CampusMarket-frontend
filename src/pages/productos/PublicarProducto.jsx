import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/publicar.css";


function PublicarProducto() {


    const navigate = useNavigate();

    const { usuario } = useContext(AuthContext);
    const [notificacion,setNotificacion] = useState(null);


    const [producto, setProducto] = useState({

        nombre: "",
        descripcion: "",
        precio: "",
        estado: "DISPONIBLE",
        condicion: "USADO",
        categoriaId: ""

    });


    const [imagen, setImagen] = useState(null);



    const cambiar = (e) => {

        setProducto({

            ...producto,

            [e.target.name]: e.target.value

        });

    };



    const seleccionarImagen = (e) => {

        setImagen(e.target.files[0]);

    };



    const publicar = async (e) => {

        e.preventDefault();


        try {


            const respuesta = await api.post(

                "/productos",

                {
                    ...producto,
                    usuarioId: usuario.id
                }

            );


            const productoCreado = respuesta.data;



            if(imagen){


                const formData = new FormData();


                formData.append(
                    "archivo",
                    imagen
                );



                await api.post(

                    `/productos/${productoCreado.id}/imagen`,

                    formData,

                    {
                        headers:{
                            "Content-Type":"multipart/form-data"
                        }
                    }

                );

            }



            alert("Producto publicado");


            navigate("/productos");



        } catch(error){


            console.log(
                "ERROR:",
                error
            );


            console.log(
                "RESPUESTA:",
                error.response?.data
            );


            alert("No se pudo publicar");


        }


    };




   return (

<div className="publicar-container">


<div className="publicar-card">


<h1>
Publicar producto
</h1>



<form onSubmit={publicar}>


<div className="form-grupo">

<label>
Nombre del producto
</label>


<input

name="nombre"

placeholder="Ejemplo: Laptop Lenovo"

onChange={cambiar}

/>

</div>





<div className="form-grupo">

<label>
Descripción
</label>


<textarea

name="descripcion"

placeholder="Describe tu producto"

onChange={cambiar}

/>

</div>





<div className="form-fila">


<div className="form-grupo">

<label>
Precio
</label>


<input

type="number"

name="precio"

placeholder="S/."

onChange={cambiar}

/>


</div>





<div className="form-grupo">

<label>
Condición
</label>


<select

name="condicion"

onChange={cambiar}

>


<option value="USADO">
Usado
</option>


<option value="NUEVO">
Nuevo
</option>


</select>


</div>



</div>





<div className="form-grupo">

<label>
Categoría
</label>


<select

name="categoriaId"

onChange={cambiar}

>


<option value="">
Seleccione categoría
</option>


<option value="1">
Tecnología
</option>


<option value="2">
Libros
</option>


<option value="3">
Ropa
</option>


<option value="4">
Otros
</option>


</select>


</div>





<div className="form-grupo">

<label>
Imagen del producto
</label>


<input

type="file"

accept="image/*"

onChange={seleccionarImagen}

/>


</div>





<button

type="submit"

className="btn-publicar"

>

Publicar producto

</button>



</form>


</div>


</div>

);

}


export default PublicarProducto;