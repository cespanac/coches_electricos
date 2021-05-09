import React from "react";
import "./Recarga2.css";
import logotipo from "../../../Assets/Logotipo.svg";
import vector from "../../../Assets/vector.svg";
import { Link } from "react-router-dom";

function Recarga2() {
  return (
    <div className="main-recarga2">
      <div className="imagen-recarga">
        <img src={logotipo} alt="logotipo" id="imagen-logotipo"></img>
      </div>

      <div className="text-vector">
        <h1> Recarga lista </h1>
        <img src={vector} alt="vector" id="imagen-vector"></img>
      </div>

      <div className="hora-precio">
        <div className="hora-column">
          <p className="hora">HORA</p> <h4>11:15</h4>
        </div>
        <div className="hora-column">
          <p className="hora">PRECIO</p> <h4>15€</h4>
        </div>
      </div>
      <div className="valoracion">
        <button>
          <i className="fas fa-star"></i>
        </button>

        <button>
          <i className="fas fa-star"></i>
        </button>

        <button>
          <i className="fas fa-star"></i>
        </button>

        <button>
          <i className="fas fa-star"></i>
        </button>

        <button>
          <i className="fas fa-star"></i>
        </button>
      </div>
      <div className="botones">
        <div className="boton-gracias">
          <Link className="link" to="/home">
            <button className="gracias">Gracias</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Recarga2;
