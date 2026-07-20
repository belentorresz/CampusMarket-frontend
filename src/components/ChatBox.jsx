import {
    useEffect,
    useRef,
    useState
} from "react";


import {
    useChat
} from "../context/ChatContext";


import api from "../api/axios";
import "../styles/chatBox.css";



function ChatBox({
    chatId,
    usuarioId,
    nombreUsuario
}){


    const {
        mensajes,
        setMensajes,
        conectarChat,
        desconectarChat
    } = useChat();



    const [texto,setTexto] = useState("");



    const finalChat = useRef(null);




    useEffect(()=>{


        if(!chatId)
            return;


        cargarMensajes();

        conectarChat(chatId);



        return ()=>{

            desconectarChat();

        };


    },[chatId]);





    useEffect(()=>{


        finalChat.current?.scrollIntoView({
            behavior:"smooth"
        });


    },[mensajes]);






    const cargarMensajes = async()=>{


        try{


            const respuesta =
            await api.get(
                `/chat/${chatId}/mensajes`
            );



            console.log(
                "MENSAJES:",
                respuesta.data
            );



            setMensajes(
                respuesta.data
            );



        }catch(error){

            console.log(error);

        }


    };







    const enviar = async()=>{


        if(texto.trim()==="")
            return;



        const mensaje = {

            remitente: usuarioId,

            mensaje:texto

        };



        try{


            await api.post(

                `/chat/${chatId}/mensaje`,

                mensaje

            );



            setTexto("");



        }catch(error){

            console.log(error);

        }


    };






return(

<div className="chatbox">


    <div className="chat-header">


        <div>

            <strong>
                {nombreUsuario}
            </strong>


            <span className="online-status">

                <i></i>

                online

            </span>

        </div>


    </div>





    <div className="chat-messages">


    {
        mensajes.map((m)=>(


            <div

            key={m.id}

            className={
                m.remitente === usuarioId
                ?
                "message mine"
                :
                "message"
            }

            >


                {
                m.remitente !== usuarioId &&
                <strong>
                    {m.nombreRemitente || "Usuario"}
                </strong>
                }



                <p>
                    {m.mensaje}
                </p>


                <small>
                    10:15 am
                </small>


            </div>


        ))
    }



    <div ref={finalChat}></div>


    </div>





    <div className="chat-input">


        <input


        value={texto}


        onChange={
            e=>setTexto(e.target.value)
        }


        onKeyDown={

            e=>{

                if(e.key==="Enter")

                    enviar();

            }

        }


        placeholder="Escribe un mensaje..."


        />



        <button

        onClick={enviar}

        >

            ➤

        </button>



    </div>


</div>

);


}



export default ChatBox;