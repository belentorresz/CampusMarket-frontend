import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/layout.css";

function Layout({children}){

    return(

        <>

            <Navbar/>

            <main className="layout">

                <div className="container">

                    {children}

                </div>

            </main>

            <Footer/>

        </>

    );

}

export default Layout;