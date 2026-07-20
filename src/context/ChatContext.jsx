import {
    createContext,
    useContext,
    useState
} from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const ChatContext = createContext();

export function ChatProvider({ children }) {

    const [mensajes, setMensajes] = useState([]);
    const [cliente, setCliente] = useState(null);

    const conectarChat = (chatId) => {

        if (cliente) {
            cliente.deactivate();
        }

        const stomp = new Client({

            webSocketFactory: () =>
                new SockJS("http://localhost:8080/ws"),

            reconnectDelay: 5000,

            onConnect: () => {

                console.log("✅ WEBSOCKET CONECTADO");

                stomp.subscribe(`/topic/chat/${chatId}`, (respuesta) => {

                    console.log("📩 MENSAJE RECIBIDO");

                    const mensaje = JSON.parse(respuesta.body);

                    console.log(mensaje);

                    setMensajes(prev => [
                        ...prev,
                        mensaje
                    ]);

                });

            },

            onStompError: (frame) => {

                console.log("❌ ERROR STOMP");
                console.log(frame);

            },

            onWebSocketError: (error) => {

                console.log("❌ ERROR WEBSOCKET");
                console.log(error);

            }

        });

        stomp.activate();

        setCliente(stomp);

    };

    const desconectarChat = () => {

        if (cliente) {
            cliente.deactivate();
            setCliente(null);
        }

    };

    return (

        <ChatContext.Provider
            value={{
                mensajes,
                setMensajes,
                conectarChat,
                desconectarChat
            }}
        >

            {children}

        </ChatContext.Provider>

    );

}

export function useChat() {
    return useContext(ChatContext);
}