import api from "./axios";


export const crearChat = async(usuario1, usuario2)=>{

    const respuesta = await api.post("/chat",{

        usuario1,
        usuario2

    });


    return respuesta.data;

};



export const obtenerMensajes = async(chatId)=>{

    const respuesta = await api.get(
        `/chat/${chatId}/mensajes`
    );


    return respuesta.data;

};



export const enviarMensaje = async(chatId, data)=>{


    const respuesta = await api.post(

        `/chat/${chatId}/mensaje`,

        data

    );


    return respuesta.data;

};