import CSS from "./component.css?inline"; // ONLY VITE
import ComponentNameTemplate from "./componentNameTemplate.js";

class ComponentName extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        const ComponentNameCSS = new CSSStyleSheet();
        ComponentNameCSS.replaceSync(CSS);
        shadowRoot.adoptedStyleSheets.push(ComponentNameCSS);
        shadowRoot.appendChild(ComponentNameTemplate.content.cloneNode(true));
    }

    // Defining the observed attributes
    static get observedAttributes() {
        return ["data-attr"];
    }

    connectedCallback() {
        console.log("ComponentName added to the DOM.");
    }

    disconnectedCallback() {
        console.log("ComponentName removed from the DOM.");
    }

    adoptedCallback() {
        console.log("ComponentName moved to a new document.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
    }
}
customElements.define("web-component", ComponentName);
export { ComponentName };
