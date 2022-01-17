import React, { useState } from "react";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context";
// import styles from "./login.module.css";

import "../assets/css/acesso.css";

import "../assets/css/bootstrap.min.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await loginUser(dispatch, { email, password });

      if (!response.user) {
        return;
      } else {
        props.history.push("/dashboard");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper text-center align-self-center bg-white fadeInDown">
      <div id="formContent" className="mx-auto">
        <div id="pos" className=" fadeIn first">
          <img
            src="https://cdn.discordapp.com/attachments/903648633851871266/930798924325851136/user.png"
            id="icon"
            alt="User Icon"
          />
        </div>
        <form action="Logar" method="POST">
          <input
            type="text"
            maxLength="11"
            className="fadeIn second"
            name="cpf"
            placeholder="CPF 00000000000"
            required=""
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="senha"
            placeholder="SENHA"
            required=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />

          <input
            type="button"
            onClick={handleLogin}
            className="fadeIn fourth"
            value="Log In"
          />
        </form>
        {errorMessage ? <p className="error">{errorMessage}</p> : null}
        <div id="formFooter">
          <a className="underlineHover" href="DadosCadastrarUsuario">
            Solicitar Acesso
          </a>
        </div>
        <div id="formFooter">
          <p>
            ® SG System. <a href="#">Salvioni</a>. v2.00.0{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
