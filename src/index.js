// Importa o React para utilizar funcionalidades de componentes.
import React from "react";

// Importa o ReactDOM para manipular o DOM com React.
import ReactDOM from "react-dom";

// Importa o componente App, que é o componente raiz da aplicação.
import App from "./App";

// Renderiza o componente App dentro do elemento com id 'root' no DOM.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
