import {
useContext,
useEffect,
useState
} from "react";

import {
AuthContext
} from "../context/AuthContext";

import {
useParams
} from "react-router-dom";

import ChatBox from "../components/ChatBox";

import api from "../api/axios";

import "../styles/chat.css";



function ChatPage(){


const {id}=useParams();

const {usuario}=useContext(AuthContext);


const [nombreUsuario,setNombreUsuario]=useState("");



useEffect(()=>{

    cargarChat();

},[id]);




const cargarChat=async()=>{

    try{

        const respuesta =
        await api.get(`/chat/${id}`);


        const chat = respuesta.data;


        if(chat.usuario1 === usuario.id){

            setNombreUsuario(
                chat.nombreUsuario2
            );

        }else{

            setNombreUsuario(
                chat.nombreUsuario1
            );

        }


    }catch(error){

        console.log(error);

    }

};




return(

<div className="chat-page">


<div className="chat-header">

<h1>
Chat
</h1>

<p>
Coordina la compra o venta de tu producto.
</p>

</div>



<div className="chat-wrapper">


<ChatBox

chatId={id}

usuarioId={usuario.id}

nombreUsuario={nombreUsuario}

/>


</div>


</div>

)

}


export default ChatPage;