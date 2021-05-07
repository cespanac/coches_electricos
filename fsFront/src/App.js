import "./App.css";
import React, { useState } from "react";
import AuthContext from "./contexts/AuthContext";
import Signin from "./components/Signin/Signin";
import General from "./components/General/General";
import Intro from "./components/Intro/Intro";
import RegistroP2 from "./components/RegistroP2/RegistroP2";
import RegistroP3 from "./components/RegistroP3/RegistroP3";
import Tarjeta from "./components/Tarjeta/Tarjeta";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Recarga from './componets/Recarga/Recarga';





function App() {
  const [menu, setMenu] = useState(false);
  const [token, setToken] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleNombre = (event) => {
    setNombre(event.target.value);
  };
  const handleApellido = (event) => {
    setApellido(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePass = (event) => {
    setPass(event.target.value);
  };

  const funcionesSignup = {
    handleNombre,
    handleApellido,
    handleEmail,
    handlePass,
  };

  const toggleMenu = () => setMenu(!menu);

  const logout = async () => {
    await sessionStorage.setItem("token", "");
    await setToken(sessionStorage.getItem("token"));
  };

  const signin = (token) => {
    sessionStorage.setItem("token", token);
    setToken(token);
  };

  const dataContext = {
    menu,
    toggleMenu,
    logout,
    token,
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          {token !== "" ? (
            <AuthContext.Provider value={dataContext}>
              <Route path="/home" component={General} />
            </AuthContext.Provider>
          ) : (
            <Route exact path="/">
              <Signin signin={signin} />
            </Route>
          )}
          <Route path="/signup" component={Intro} />
          <Route path="/registroP2">
            <RegistroP2 data={funcionesSignup} />
          </Route>
          <Route path="/registroP3">
            <RegistroP3 data={{nombre, apellido, email, pass}} login={signin} />
          </Route>
          <Route path="/tarjeta">
            <Tarjeta />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
