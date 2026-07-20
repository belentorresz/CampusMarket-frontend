import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";
import logo from "../assets/logo.png";


function Navbar(){

    const {usuario, logout}=useContext(AuthContext);
    const navigate = useNavigate();


    return(

 <nav className="navbar">

<div className="navbar-container">


<Link to="/" className="navbar-brand">

    <img
        src={logo}
        alt="AyniUnsa"
        className="logo"
    />

    <span>
        AyniUnsa
    </span>

</Link>

<div className="nav-links">

<Link className="nav-link" to="/">
Inicio
</Link>

<Link className="nav-link" to="/productos">
Catálogo
</Link>

{
usuario &&

<Link className="nav-link" to="/chats">
Mensajes
</Link>

}

{
usuario &&

<Link className="nav-link" to="/mis-productos">
    Mis publicaciones
</Link>

}

{
usuario &&

<Link className="nav-link" to="/favoritos">
    Favoritos
</Link>

}


</div>



<div className="usuario">

{
usuario ?

<>

<Link to="/perfil">

<img

className="avatar"

src={
usuario.foto
?
`http://localhost:8080/uploads/perfiles/${usuario.foto}`
:
"https://ui-avatars.com/api/?background=0d6163&color=fff&name="+usuario.nombre
}

alt="perfil"

/>

</Link>

<Link
className="nav-link"
to="/perfil"
>

{usuario.nombre}

</Link>

<button
className="salir"
onClick={()=>{

    logout();

    navigate("/");

}}
>
Salir
</button>

</>

:

<>

<Link
className="nav-link"
to="/login"
>

Login

</Link>

<Link
className="nav-link"
to="/registro"
>

Registro

</Link>

</>

}

</div>

</div>

</nav>

    )

}


export default Navbar;