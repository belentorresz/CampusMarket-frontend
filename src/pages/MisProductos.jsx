import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/cards.css";
import "../styles/misProductos.css";


function MisProductos(){


    const [productos,setProductos] = useState([]);

    const navigate = useNavigate();



    useEffect(()=>{


        const usuario =
            JSON.parse(localStorage.getItem("usuario"));


        if(usuario){


            axios.get(
                `/productos/usuario/${usuario.id}`
            )

            .then(res=>{

                setProductos(res.data);

            })

            .catch(error=>{

                console.log(error);

            });


        }


    },[]);




    const eliminarProducto = async(id)=>{


        const confirmar =
            window.confirm(
                "¿Eliminar producto?"
            );


        if(!confirmar)
            return;



        try{


            await axios.delete(
                `/productos/${id}`
            );


            setProductos(

                productos.filter(
                    producto =>
                    producto.id !== id
                )

            );


        }catch(error){

            console.log(error);

        }


    };



    return(


        <div>


            <h1 className="titulo-pagina">
                Mis publicaciones
            </h1>


            <button

                className="perfil-btn-primary"

                onClick={() => navigate("/publicar")}

                >
                    ➕ Publicar producto
            </button>



            {
                productos.length === 0 ?


                (

                    <p>
                        No tienes publicaciones todavía
                    </p>

                )


                :


                (


                <div className="productos-grid">


                {
                    productos.map(producto=>(


                        <div
                        className="producto-card"
                        key={producto.id}
                        >


                            <div className="producto-imagen">


                                <img

                                    src={
                                        producto.imagen
                                        ?
                                        `https://campusmarket-production-98d0.up.railway.app/uploads/productos/${producto.imagen}`
                                        :
                                        "https://via.placeholder.com/400"
                                    }

                                alt={producto.nombre}

                                />


                            </div>




                            <div className="producto-info">


                                <h3>
                                    {producto.nombre}
                                </h3>



                                <p className="precio">

                                    S/. {producto.precio}

                                </p>



                                <span className="estado">

                                    {producto.estado}

                                </span>



                                <div className="acciones">


                                    <button

                                    className="btn-editar"

                                    onClick={()=>
                                        navigate(
                                        `/editar-producto/${producto.id}`
                                        )
                                    }

                                    >

                                        Editar

                                    </button>




                                    <button

                                    className="btn-eliminar"

                                    onClick={()=>
                                        eliminarProducto(producto.id)
                                    }

                                    >

                                        Eliminar

                                    </button>


                                </div>


                            </div>


                        </div>


                    ))
                }


                </div>


                )

            }



        </div>


    );


}


export default MisProductos;