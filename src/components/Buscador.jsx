import { useState } from "react";


function Buscador({ buscar }) {


    const [texto, setTexto] = useState("");



    const enviar = (e) => {

        e.preventDefault();

        buscar(texto);

    };



    return (

        <form 
            className="buscador-container"
            onSubmit={enviar}
        >

            <div className="buscador-input">

                <input

                    type="text"

                    placeholder="Buscar productos..."

                    value={texto}

                    onChange={
                        e => setTexto(e.target.value)
                    }

                />

            </div>



            <button 
                className="btn-primary"
                type="submit"
            >
                Buscar
            </button>

        </form>

    );


}


export default Buscador;