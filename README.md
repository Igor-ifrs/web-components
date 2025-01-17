# WebComponent Boilerplate

A lightweight and flexible boilerplate for creating custom Web Components using vanilla JavaScript. This project provides a structured foundation for building reusable, encapsulated components with Shadow DOM and scoped styles.

## Features

- Shadow DOM encapsulation for isolated component styling
- Modular architecture with separated style and logic files
- Support for all standard Web Component lifecycle methods
- Built-in attribute observation system
- No external dependencies or frameworks required

## Project Structure

```
project-root/
├── src/
│   ├── components/
│   │   ├── component.style.js   # Component-specific styles
│   │   └── component.js         # Component logic and implementation
└── index.html                   # Usage example and demo page
```

## Getting Started

### Prerequisites

- Modern web browser with Web Components support
- Basic understanding of JavaScript and DOM APIs

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/webcomponent-boilerplate.git
cd webcomponent-boilerplate
```

2. Start using the boilerplate by modifying the existing files according to your needs.

### Usage Example

1. Import your component in HTML:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebComponent Demo</title>
    <script type="module" src="./src/components/component.js"></script>
</head>
<body>
    <component-name data-attr="example"></component-name>
</body>
</html>
```

2. Define your component's logic:
```javascript
import style from "./component.style.js";

export default class ComponentName extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.adoptedStyleSheets.push(style);
        shadowRoot.innerHTML = "<slot></slot>";
    }

    // ... other methods
}

customElements.define('component-name', ComponentName);
```

## Component Lifecycle Methods

The boilerplate includes all standard Web Component lifecycle methods:

- **connectedCallback()**: Invoked when the component is added to the document's DOM
- **disconnectedCallback()**: Called when the component is removed from the DOM
- **adoptedCallback()**: Triggered when the component is moved to a new document
- **attributeChangedCallback(name, oldValue, newValue)**: Executed when observed attributes change

## Customization

### Styling

Styles are managed in `component.style.js` using Constructable Stylesheets:

```javascript
const sheet = new CSSStyleSheet();
sheet.replaceSync(`
    :host {
        display: block;
        /* Your default styles here */
    }
`);

export default sheet;
```

### Attributes

Define observed attributes in your component class:

```javascript
static get observedAttributes() {
    return ["data-attr"];
}
```

## Best Practices

1. Always use Shadow DOM for style encapsulation
2. Keep styles and logic in separate files for better maintainability
3. Use meaningful component and attribute names
4. Implement error handling for attribute changes
5. Document your component's API and usage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Web Components specifications and standards
- Modern web browsers' native component support

---

For more information about Web Components, visit [MDN Web Components Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
