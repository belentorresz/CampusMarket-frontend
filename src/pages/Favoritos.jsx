import {
    useContext,
    useEffect,
    useState
} from "react";

import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import ProductoCard from "../components/ProductoCard";

import "../styles/catalogo.css";

function Favoritos(){

    const { usuario } = useContext(AuthContext);

    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {

        if(usuario){

            cargarFavoritos();

        }

    }, [usuario]);

    const cargarFavoritos = async () => {

        try{

            const respuesta = await api.get(
                `/favoritos/${usuario.id}`
            );

            setFavoritos(respuesta.data);

        }catch(error){

            console.log(error);

        }

    };

    return(

        <div className="catalogo-container">

            <h1>❤️ Mis Favoritos</h1>

            <div className="productos-grid">

                {
                    favoritos.length > 0 ?

                    favoritos.map(favorito => (

                        <ProductoCard
                            key={favorito.id}
                            producto={favorito.producto}
                        />

                    ))

                    :

                    <p>
                        Aún no has agregado productos a favoritos.
                    </p>

                }

            </div>

        </div>

    );

}

export default Favoritos;