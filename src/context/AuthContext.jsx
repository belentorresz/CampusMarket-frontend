import {
    createContext,
    useState,
    useEffect
} from "react";

import api from "../api/axios";


export const AuthContext = createContext();



export function AuthProvider({children}){


    const [usuario,setUsuario] = useState(
        JSON.parse(
            localStorage.getItem("usuario")
        ) || null
    );


    const login = async(data)=>{


        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "correo",
            data.correo
        );


        try{


            const respuesta =
            await api.get("/usuarios/me");


            console.log("USUARIO /me:", respuesta.data);

            localStorage.setItem(
                "usuario",
                JSON.stringify(respuesta.data)
            );


            setUsuario(
                respuesta.data
            );


        }catch(error){

            console.log(
                "Error obteniendo usuario",
                error
            );

        }


    };




    const logout=()=>{


        localStorage.removeItem("token");

        localStorage.removeItem("correo");

        localStorage.removeItem("usuario");


        setUsuario(null);


    };




    return(

        <AuthContext.Provider

        value={{
            usuario,
            setUsuario,
            login,
            logout
        }}

        >

            {children}

        </AuthContext.Provider>

    );


}