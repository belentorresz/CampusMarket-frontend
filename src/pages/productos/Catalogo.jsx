import {
useEffect,
useState
} from "react";

import { Link } from "react-router-dom";

import api from "../../api/axios";
import ProductoCard from "../../components/ProductoCard";
import Buscador from "../../components/Buscador";
import Filtros from "../../components/Filtros";

import "../../styles/catalogo.css";

function Catalogo(){

    const [productos,setProductos]=useState([]);

    useEffect(()=>{

        cargar();

    },[]);


    const cargar = async(params={})=>{

        try{

            const respuesta = await api.get(
                "/productos/buscar",
                { params }
            );

            setProductos(respuesta.data);

        }catch(error){

            console.log(error);

        }

    };


    return(

        <div className="catalogo">


            <div className="catalogo-header">

                <div>

                    <h1>
                        Catálogo AyniUnsa
                    </h1>

                    <p>
                        Encuentra productos publicados por estudiantes de la
                        Universidad Nacional de San Agustín.
                    </p>

                </div>

            </div>



            <div className="catalogo-buscador">

                <Buscador
                    buscar={(nombre)=>cargar({nombre})}
                />

                <Filtros
                    filtrar={(filtro)=>cargar(filtro)}
                />

            </div>



            <p className="catalogo-total">

                {productos.length} productos disponibles

            </p>



            <div className="productos-grid">

                {productos.map(producto=>(

                    <ProductoCard
                        key={producto.id}
                        producto={producto}
                    />

                ))}

            </div>

        </div>

    );

}

export default Catalogo;