# WebComponent Boilerplate

Este repositório fornece um boilerplate para criar WebComponents usando JavaScript. Ele inclui um exemplo de componente com um shadow DOM e estilos adotados.

## Estrutura do Projeto
├── componet.style.js
├── componet.js
└── index.html
## Mova conforme sua necessidade
- **componet.style.js**: Contém os estilos do componente.
- **componet.js**: Define a lógica do WebComponent.
- **index.html**: Um exemplo de uso do componente.

## Começando

Siga os passos abaixo para configurar e utilizar o boilerplate.

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

import style from "./componet.style.js";

export default class ComponetName extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets.push(style);
        shadowRoot.innerHTML = "<slot></slot>";
    }

    static get observedAttributes() {
        return ["data-attr"];
    }

    connectedCallback() {
        console.log("ComponetName added to the DOM.");
    }

    disconnectedCallback() {
        console.log("ComponetName removed from the DOM.");
    }

    adoptedCallback() {
        console.log("ComponetName moved to a new document.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute: ${name} changed from ${oldValue} to ${newValue}`);
    }
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebComponent Example</title>
    <script type="module" src="./componet.js"></script>
</head>
<body>
    <componet-name data-attr="example"></componet-name>
</body>
</html>

Abra index.html em seu navegador para ver o WebComponent em ação.

Métodos do Componente
connectedCallback: Chamado quando o elemento é adicionado ao DOM.
disconnectedCallback: Chamado quando o elemento é removido do DOM.
adoptedCallback: Chamado quando o elemento é movido para um novo documento.
attributeChangedCallback: Chamado quando um atributo observado é adicionado, removido ou alterado.
Contribuições
Sinta-se à vontade para abrir issues e pull requests para melhorias.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.