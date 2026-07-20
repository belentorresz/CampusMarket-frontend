import {
useEffect,
useState,
useContext
} from "react";

import {
AuthContext
} from "../context/AuthContext";

import {
Link
} from "react-router-dom";

import api from "../api/axios";
import "../styles/chat.css";



function Chats(){


const {usuario}=useContext(AuthContext);


const [chats,setChats]=useState([]);



useEffect(()=>{


cargarChats();


},[]);



const cargarChats=async()=>{


try{


const respuesta =
await api.get(
`/chat/usuario/${usuario.id}`
);


setChats(respuesta.data);



}catch(error){

console.log(error);

}




};


const ordenarChats = () => {

    const ordenados = [...chats].reverse();

    setChats(ordenados);

};

return(

<div className="chats-page">


    <div className="chats-header">

        <h1>
            Mis chats
        </h1>

        <p>
            Conversaciones con estudiantes interesados en tus productos.
        </p>

    </div>



    <div className="chats-top">

        <h3>
            Mensajes directos
        </h3>


        <button
            className="ordenar-btn"
            onClick={ordenarChats}
        >
            Ordenar por: Última actividad
        </button>

    </div>




    <div className="chat-list">


    {
    chats.map(chat=>(


        <div
        className="chat-card"
        key={chat.id}
        >


            <div className="chat-text">


                <h3>
                    {chat.nombreUsuario}
                </h3>


                <p className="estado-chat">
                    Conversación activa
                </p>


                <p className="ultimo-chat">
                    Última conversación
                </p>


            </div>



            <Link
            className="chat-btn"
            to={`/chat/${chat.id}?nombre=${chat.nombreUsuario}`}
            >
                Abrir chat
            </Link>



        </div>


    ))
    }


    </div>


</div>

)



}


export default Chats;