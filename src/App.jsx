import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Layout from "./layouts/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";


import Catalogo from "./pages/productos/Catalogo";
import DetalleProducto from "./pages/productos/DetalleProducto";
import PublicarProducto from "./pages/productos/PublicarProducto";
import Checkout from "./pages/Checkout";
import MisCompras from "./pages/compras/MisCompras";
import Favoritos from "./pages/Favoritos";
import Ventas from "./pages/Ventas";
import RecuperarPassword from "./pages/RecuperarPassword";
import NuevaPassword from "./pages/NuevaPassword";

import Chats from "./pages/Chats";
import ChatPage from "./pages/ChatPage";


import Perfil from "./pages/perfil/Perfil";
import EditarPerfil from "./pages/EditarPerfil";


import MisProductos from "./pages/MisProductos";
import EditarProducto from "./pages/EditarProducto";



function App(){


    return (

        <BrowserRouter>


            <Layout>


                <Routes>


                    <Route
                        path="/"
                        element={<Home/>}
                    />


                    <Route
                        path="/login"
                        element={<Login/>}
                    />


                    <Route
                        path="/registro"
                        element={<Registro/>}
                    />


                    <Route
                        path="/productos"
                        element={<Catalogo/>}
                    />


                    <Route
                        path="/producto/:id"
                        element={<DetalleProducto/>}
                    />


                    <Route
                        path="/publicar"
                        element={<PublicarProducto/>}
                    />


                    <Route
                        path="/mis-productos"
                        element={<MisProductos/>}
                    />


                    <Route
                        path="/editar-producto/:id"
                        element={<EditarProducto/>}
                    />


                    <Route
                        path="/chats"
                        element={<Chats/>}
                    />


                    <Route
                        path="/chat/:id"
                        element={<ChatPage/>}
                    />


                    <Route
                        path="/perfil"
                        element={<Perfil/>}
                    />


                    <Route
                        path="/editar-perfil"
                        element={<EditarPerfil/>}
                    />

                    <Route

                        path="/checkout/:id"

                        element={<Checkout/>}

                    />

                    <Route
                        path="/mis-compras"
                        element={<MisCompras/>}
                    />

                    <Route
                        path="/favoritos"
                        element={<Favoritos />}
                    />
                    <Route
                        path="/mis-ventas"
                        element={<Ventas/>}
                    />

                    <Route 
                    path="/recuperar-password" 
                    element={<RecuperarPassword />}
                    />


                    <Route 
                    path="/nueva-password" 
                    element={<NuevaPassword />}
                    />


                </Routes>


            </Layout>


        </BrowserRouter>

    );


}


export default App;