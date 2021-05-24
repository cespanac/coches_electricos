import React, { useContext } from "react";
import FacebookLogin from "react-facebook-login";
import AuthContext from "../../contexts/AuthContext";
import "./Facebook.css";
import { useHistory } from "react-router-dom";

const Facebook = () => {
  const history = useHistory();
  const dataContext = useContext(AuthContext);

  const responseFacebook = async (response) => {
    history.push({
      pathname: "registroP3",
      state: {
        name: response.name,
        email: response.email
      }
    });
  };

  return (
    <div>
      <FacebookLogin
        appId="180266487194624"
        appSecret="68d41c54faa5a8aa42c995a59da44ccf"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="facebook"
        textButton="facebook"
        size="large"
      />
      <br />
    </div>
  );
};

export default Facebook;
