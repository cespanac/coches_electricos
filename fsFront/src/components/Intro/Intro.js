import React from "react";
import "./Intro.css";
import Facebook from "../Facebook/Facebook";
import logo from "../../assets/Logotipo.svg";
import atras from "../../assets/atras.svg";
import { Link } from "react-router-dom";
import Facebook from '../FacebookLogin/facebook'


function Intro() {

  return (
    <div className="todo-intro">
      <Link to="/">
        <img src={atras} alt="atras" id="img-atras" />
      </Link>
      <div className="main-singup">
        <div className="logo">
          <img src={logo} alt="logo-app" id="logo-signup" />
        </div>
        <div className="botones-signup">
          <button className="registrate">
            <Link to="/registroP2">REGISTRARSE</Link>
          </button>
          <div className="text-redessoci">
            <h3>o conéctate a través de las redes sociales</h3>
          </div>
<<<<<<< HEAD
=======
          <Facebook />
          <div className="botones-redessoci">
            <button className="btn-google">Google</button>
          </div>
>>>>>>> develop
        </div>
        <Facebook />
      </div>
      <div >
      </div>
      <div className="botones-redessoci">
        <br /><br /><br /><br />
      </div>
    </div>
  );
}

export default Intro;
