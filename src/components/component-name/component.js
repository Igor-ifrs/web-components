import style from "./componet.style.js";
export default class ComponetName extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets.push(style);
        shadowRoot.innerHTML = "<slot></slot>";
    }

    // Definindo os atributos observados
    static get observedAttributes() {
        return ["data-attr"];
    }

    // Chamado quando o elemento é adicionado ao DOM
    connectedCallback() {
        console.log("ComponetName added to the DOM.");
    }

    // Chamado quando o elemento é removido do DOM
    disconnectedCallback() {
        console.log("ComponetName removed from the DOM.");
    }

    // Chamado quando o elemento é movido para um novo documento
    adoptedCallback() {
        console.log("ComponetName moved to a new document.");
    }

    // Chamado quando um atributo observado é adicionado, removido ou alterado
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
    }
}
