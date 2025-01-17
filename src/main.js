import ComponetName from "./components";

// Registra o novo elemento customizado
customElements.define("web-component", ComponetName);
console.log(document.querySelector("web-component"));
