/*----------------------------------------CSS CONFIG ONLY VITE----------------------------------------*/
import CSS from "./component.css?inline";
/** @type {CSSStyleSheet} */
const ComponentNameCSS = new CSSStyleSheet();
ComponentNameCSS.replaceSync(CSS);
/*----------------------------------------END CSS CONFIG----------------------------------------------*/

/** @type {HTMLTemplateElement} */
import ComponentNameTemplate from "./componentNameTemplate.js";

class ComponentName extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
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
