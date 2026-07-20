import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/footer.css";

function Footer() {

    return (

        <footer className="footer">

            <div className="footer-container">

                <div className="footer-column">

                    <div className="footer-logo">

                        <img
                            src={logo}
                            alt="AyniUnsa"
                        />

                        <h3>AyniUnsa</h3>

                    </div>

                    <p>
                        Plataforma universitaria para comprar, vender e intercambiar
                        productos entre estudiantes de la Universidad Nacional de
                        San Agustín.
                    </p>

                </div>



                <div className="footer-column">

                    <h4>Navegación</h4>

                    <div className="footer-links">

                        <Link to="/">Inicio</Link>

                        <Link to="/productos">Catálogo</Link>

                        <Link to="/publicar">Publicar</Link>

                        <Link to="/perfil">Mi perfil</Link>

                    </div>

                </div>



                <div className="footer-column">

                    <h4>Contacto</h4>

                    <p>ayniunsa@unsa.edu.pe</p>

                    <p>Arequipa, Perú</p>

                </div>

            </div>



            <div className="footer-copy">

                © 2026 AyniUnsa · Desarrollado para la comunidad universitaria.

            </div>

        </footer>

    );

}

export default Footer;