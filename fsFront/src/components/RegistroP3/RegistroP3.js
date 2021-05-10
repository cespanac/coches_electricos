import React, { useState } from "react";
import "./RegistroP3.css";
import { Link } from "react-router-dom";
import atras from "../../assets/atras.svg";
import FetchSignup from "../../Hooks/FetchSignup";
import { useHistory } from "react-router-dom";

function Registrop3(props) {
  const history = useHistory();
  const [nombre] = useState(props.data.nombre);
  const [apellido] = useState(props.data.apellido);
  const [email] = useState(props.data.email);
  const [pass] = useState(props.data.pass);
  const [movil, setMovil] = useState("");

  const handleMovil = (e) => {
    setMovil(e.target.value);
  };

  const signup = async () => {
    const result = await FetchSignup(nombre, apellido, email, pass, movil);
    const data = await result.json();
    if (data.status === 200) {
      alert(data.data);
      await props.data.signin(data.token)
      history.push("/tarjeta");
    }
    else if (data.status === 500) {
      alert(data.data);
    }
    else if (data.status === 500) {
      alert(data.data);
    }
    else if (data.status === 406) {
      alert(data.data);
      history.push("/registroP2");
    }
    else {
      console.log(data);
    }
  };

  return (
    <div className="todo-registrop3">
      <div className="atras">
        <Link to="/registrop2">
          <img src={atras} alt="atras" id="imagen-atras"></img>
        </Link>
      </div>
      <div className="main-registro3">
        <div className="form-registrop3">
          <h2 className="texto-registrop3">Introduce tu móvil</h2>
          <input
            type="text"
            className="input"
            placeholder="+34 __ __ __  __ __ __  __ __ __ "
            onChange={handleMovil}
          />
        </div>

        <div className="text-condiciones">
          <h3 className="text-condiciones">
            Al pulsar siguiente, acepta las Condiciones de uso y la Política de
            privacidad de ...
          </h3>
          <p className="text-condiones2">
            Marca la casilla para indicar que eres mayor de 18 años y que
            aceptas las Condiciones y la Política de privacidad
          </p>
          <input type="checkbox" name="terminos" id="terminos" />
        </div>

        <div className="botones-registrop3">
          <button onClick={signup}>SIGUIENTE</button>
        </div>
      </div>
    </div>
  );
}

export default Registrop3;
