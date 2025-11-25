/*----------------------------------------CSS CONFIG ONLY VITE----------------------------------------*/
import CSS from "./component.css?inline";
/** @type {CSSStyleSheet} */
const ComponentNameCSS = new CSSStyleSheet();
ComponentNameCSS.replaceSync(CSS);
/*----------------------------------------END CSS CONFIG----------------------------------------------*/

/** @type {HTMLTemplateElement} */
import ComponentNameTemplate from "./componentNameTemplate.js";

/**
 * ComponentName - Web Component customizado
 *
 * Um componente web reutilizável que encapsula lógica, estrutura e estilos
 * utilizando Shadow DOM para isolamento de estilo.
 *
 * @class ComponentName
 * @extends {HTMLElement}
 *
 * @example
 * // Uso básico no HTML
 * <web-component data-attr="value"></web-component>
 *
 * // Uso com JavaScript
 * const component = document.createElement('web-component');
 * component.setAttribute('data-attr', 'value');
 * document.body.appendChild(component);
 *
 * @property {string} data-attr - Atributo observado que controla o comportamento do componente
 */
class ComponentName extends HTMLElement {
    /**
     * Construtor do ComponentName
     *
     * Inicializa o Shadow DOM em modo 'open', aplica os estilos encapsulados
     * e insere o template HTML.
     */
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets.push(ComponentNameCSS);
        shadowRoot.appendChild(ComponentNameTemplate.content.cloneNode(true));
    }

    /**
     * Lista de atributos que o componente deve observar
     *
     * Qualquer mudança nesses atributos dispara o método attributeChangedCallback
     *
     * @static
     * @returns {string[]} Array com os nomes dos atributos observados
     */
    static get observedAttributes() {
        return ["data-attr"];
    }

    /**
     * Callback disparado quando o componente é inserido no DOM
     *
     * Útil para:
     * - Inicializar listeners de eventos
     * - Fazer requisições HTTP
     * - Executar lógica que depende do componente estar no DOM
     *
     * @memberof ComponentName
     */
    connectedCallback() {
        console.log("ComponentName added to the DOM.");
    }

    /**
     * Callback disparado quando o componente é removido do DOM
     *
     * Útil para:
     * - Remover listeners de eventos
     * - Limpar timers/intervals
     * - Liberar recursos
     *
     * @memberof ComponentName
     */
    disconnectedCallback() {
        console.log("ComponentName removed from the DOM.");
    }

    /**
     * Callback disparado quando o componente é movido para um novo documento
     *
     * Pode ser útil para sincronizar estado com o novo documento
     *
     * @memberof ComponentName
     */
    adoptedCallback() {
        console.log("ComponentName moved to a new document.");
    }

    /**
     * Callback disparado quando um atributo observado é alterado
     *
     * @memberof ComponentName
     * @param {string} name - Nome do atributo alterado
     * @param {string|null} oldValue - Valor anterior do atributo
     * @param {string|null} newValue - Novo valor do atributo
     */
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
    }
}
customElements.define("web-component", ComponentName);
export { ComponentName };
