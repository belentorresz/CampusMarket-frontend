import {
    useEffect,
    useState,
    useContext
} from "react";

import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";

import "../../styles/compras.css";


function MisCompras(){


    const {usuario}=useContext(AuthContext);


    const [compras,setCompras]=useState([]);



    useEffect(()=>{

        cargarCompras();

    },[]);




    const cargarCompras=async()=>{


        try{


            const respuesta =
            await api.get(
                `/compras/comprador/${usuario.id}`
            );


            setCompras(
                respuesta.data
            );


        }catch(error){

            console.log(error);

        }


    };





    return(


        <div className="compras-page">


            <h1>
                Mis compras
            </h1>


            <p className="compras-subtitulo">
                Historial de productos adquiridos.
            </p>





            {
                compras.length === 0 ?

                <div className="sin-compras">

                    No tienes compras realizadas.

                </div>


                :


                <div className="compras-grid">


                {
                    compras.map((compra)=>(


                        <div
                        className="compra-card"
                        key={compra.id}
                        >



                            <img

                            src={
                                compra.producto.imagen
                                ?
                                `http://localhost:8080/uploads/productos/${compra.producto.imagen}`
                                :
                                "https://via.placeholder.com/200"
                            }

                            alt="producto"

                            />




                            <div className="compra-info">


                                <h2>
                                    {compra.producto.nombre}
                                </h2>



                                <p>

                                    <strong>
                                    Precio:
                                    </strong>

                                    S/ {compra.producto.precio}

                                </p>




                                <p>

                                    <strong>
                                    Vendedor:
                                    </strong>

                                    {compra.vendedor.nombre}

                                </p>




                                <p>

                                    <strong>
                                    Fecha:
                                    </strong>

                                    {
                                    new Date(compra.fecha)
                                    .toLocaleDateString()
                                    }

                                </p>




                                <span
                                className={
                                    `estado ${compra.estado.toLowerCase()}`
                                }
                                >

                                    {compra.estado}

                                </span>



                            </div>



                        </div>


                    ))
                }


                </div>

            }


        </div>


    );


}


export default MisCompras;