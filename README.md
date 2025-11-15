# WebComponent Boilerplate

A lightweight and flexible boilerplate for creating custom Web Components using vanilla JavaScript. This project provides a structured foundation for building reusable, encapsulated components with Shadow DOM and scoped styles.

## Features

- 🎨 **Shadow DOM encapsulation** - Isolated component styling with no style leakage
- 📦 **Modular architecture** - Separated concerns: styles, templates, and logic
- 🔄 **Complete lifecycle support** - All standard Web Component callbacks included
- 👁️ **Attribute observation** - Reactive components that respond to attribute changes
- 🚫 **Zero dependencies** - Pure vanilla JavaScript, no frameworks required
- ⚡ **Built with Vite** - Fast development and production builds

## Project Structure

```
web-components/
├── src/
│   ├── components/
│   │   ├── index.js                          # Central export point for all components
│   │   └── component-name/
│   │       ├── component.js                  # Component class & registration
│   │       ├── componentNameTemplate.js      # HTML template
│   │       └── component.css                 # Component-scoped styles
│   ├── styles/
│   │   └── global.css                        # Global styles (reset, variables, etc.)
│   └── main.js                               # Entry point - imports components automatically
├── index.html                                # Demo page
├── package.json
└── vite.config.js (implicit)
```

## How It Works

### Auto-Registration of Components

Components are **automatically registered** when you import them:

1. **`src/main.js`** imports the components module:
   ```javascript
   import "./components";  // Automatically runs component registration
   ```

2. **`src/components/index.js`** re-exports components:
   ```javascript
   export { ComponentName } from "./component-name/component.js";
   ```

3. **`src/components/component-name/component.js`** registers the custom element:
   ```javascript
   customElements.define("web-component", ComponentName);
   ```

**No manual registration needed** — just import and use!

## Getting Started

### Prerequisites

- Modern web browser with Web Components support (all modern browsers)
- Node.js 18+ (for development with Vite)
- Basic understanding of JavaScript and DOM APIs

### Installation

1. Clone the repository:
```bash
git clone https://github.com/igor-ifrs/web-components.git
cd web-components
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Creating Your First Component

### 1. Create Component Directory

```
src/components/my-button/
├── component.js            # Component class
├── myButtonTemplate.js     # HTML template
└── component.css           # Styles
```

### 2. Define the Component Class (`component.js`)

```javascript
import CSS from "./component.css?inline";
import MyButtonTemplate from "./myButtonTemplate.js";

class MyButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        const ButtonCSS = new CSSStyleSheet();
        ButtonCSS.replaceSync(CSS);
        shadowRoot.adoptedStyleSheets.push(ButtonCSS);
        shadowRoot.appendChild(MyButtonTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ["disabled", "label"];
    }

    connectedCallback() {
        console.log("MyButton added to DOM");
        this.updateLabel();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "label") {
            this.updateLabel();
        }
        if (name === "disabled") {
            this.updateDisabled();
        }
    }

    updateLabel() {
        const label = this.getAttribute("label") || "Click me";
        const button = this.shadowRoot.querySelector("button");
        if (button) button.textContent = label;
    }

    updateDisabled() {
        const disabled = this.hasAttribute("disabled");
        const button = this.shadowRoot.querySelector("button");
        if (button) button.disabled = disabled;
    }
}

customElements.define("my-button", MyButton);
export { MyButton };
```

### 3. Create HTML Template (`myButtonTemplate.js`)

```javascript
const myButtonTemplate = document.createElement("template");
myButtonTemplate.innerHTML = `
    <button type="button">Click me</button>
`;
export default myButtonTemplate;
```

### 4. Style Your Component (`component.css`)

```css
:host {
    display: inline-block;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

### 5. Export from `src/components/index.js`

```javascript
export { ComponentName } from "./component-name/component.js";
export { MyButton } from "./my-button/component.js";
```

### 6. Use in HTML

```html
<my-button label="Submit" id="submit-btn"></my-button>
<my-button label="Cancel" disabled></my-button>
```

## Usage Examples

### Basic Usage

```html
<web-component></web-component>
```

### With Attributes

```html
<web-component data-attr="value"></web-component>
```

### JavaScript Interaction

```javascript
const component = document.querySelector("web-component");

// Change attribute
component.setAttribute("data-attr", "new-value");

// Access shadow DOM (if exposed)
const button = component.shadowRoot.querySelector("button");
button.addEventListener("click", () => console.log("Clicked!"));
```

## Component Lifecycle Methods

Web Components have a complete lifecycle with well-defined callback methods:

| Method | When Called | Use Case |
|--------|------------|----------|
| **constructor()** | Component instance created | Initialize state, attach Shadow DOM |
| **connectedCallback()** | Component added to DOM | Setup event listeners, initialize UI |
| **disconnectedCallback()** | Component removed from DOM | Cleanup: remove listeners, cancel requests |
| **adoptedCallback()** | Component moved to new document | Re-initialize for new context |
| **attributeChangedCallback(name, oldValue, newValue)** | Observed attribute changes | Update UI based on attribute changes |

### Example: Complete Lifecycle

```javascript
class MyComponent extends HTMLElement {
    constructor() {
        super();
        console.log("1. constructor() - Initialize");
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        console.log("2. connectedCallback() - Mounted to DOM");
        this.render();
        this.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
        console.log("3. disconnectedCallback() - Removed from DOM");
        this.removeEventListener("click", this.handleClick);
    }

    static get observedAttributes() {
        return ["count"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`4. attributeChangedCallback() - ${name}: ${oldValue} → ${newValue}`);
        if (name === "count") {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <p>Count: ${this.getAttribute("count") || 0}</p>
        `;
    }

    handleClick = () => console.log("Clicked!");
}
```

## Best Practices & Patterns

### 1. **Always Observe Attributes Before Using Them**
```javascript
static get observedAttributes() {
    return ["disabled", "label", "variant"];
}

attributeChangedCallback(name, oldValue, newValue) {
    // Only unobserved attributes won't trigger this
}
```

### 2. **Use CSS Variables for Theming**
```css
:host {
    --primary-color: #007bff;
    --padding: 12px;
}

button {
    background-color: var(--primary-color);
    padding: var(--padding);
}
```

```html
<my-button style="--primary-color: #28a745;"></my-button>
```

### 3. **Leverage Slots for Content Projection**
```javascript
// Template with slot
template.innerHTML = `
    <div class="card">
        <header><slot name="header"></slot></header>
        <main><slot></slot></main>
        <footer><slot name="footer"></slot></footer>
    </div>
`;
```

```html
<my-card>
    <h2 slot="header">Title</h2>
    <p>Content here</p>
    <span slot="footer">Footer</span>
</my-card>
```

### 4. **Shadow DOM Encapsulation**
- Styles in Shadow DOM don't affect the light DOM
- External styles don't affect component internals
- Use `:host` and `:host()` for styling from outside

### 5. **Clean Event Listeners**
```javascript
connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.addEventListener("click", this.handleClick);
}

disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
}
```

### 6. **Property vs Attribute**
```javascript
// Attributes (strings in HTML)
component.setAttribute("disabled", "");
const isDisabled = component.hasAttribute("disabled");

// Properties (JavaScript objects)
component.myData = { /* ... */ };
component.callback = () => {};
```

## Common Patterns & Recipes

### Toggle Component State
```javascript
class MyToggle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._active = false;
    }

    connectedCallback() {
        this.render();
        this.addEventListener("click", () => this.toggle());
    }

    toggle() {
        this._active = !this._active;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <button class="${this._active ? 'active' : ''}">
                ${this._active ? 'ON' : 'OFF'}
            </button>
        `;
    }
}
```

### Validate Attributes
```javascript
attributeChangedCallback(name, oldValue, newValue) {
    if (name === "width") {
        if (isNaN(newValue) || newValue < 0) {
            console.warn(`Invalid width: ${newValue}`);
            this.setAttribute("width", oldValue);
        }
    }
}
```

### Dispatch Custom Events
```javascript
connectedCallback() {
    this.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("item-selected", {
            detail: { id: this.id },
            bubbles: true,
            composed: true  // Crosses Shadow DOM boundary
        }));
    });
}
```

```javascript
// Usage
document.addEventListener("item-selected", (e) => {
    console.log("Selected:", e.detail);
});
```

## Troubleshooting

### Component not registering
- ✅ Check that `src/main.js` imports `"./components"`
- ✅ Verify `customElements.define()` is called with correct tag name

### Styles not applying
- ✅ Ensure CSS is imported with `?inline` (Vite syntax)
- ✅ Check `:host` selector for component-level styles
- ✅ Verify Shadow DOM is attached before styles

### Events not firing
- ✅ Add `composed: true` to CustomEvent if it needs to bubble from Shadow DOM
- ✅ Use arrow functions or bind event handlers
- ✅ Clean up listeners in `disconnectedCallback()`

### Attribute changes not detected
- ✅ Add attribute name to `observedAttributes` array
- ✅ Use lowercase attribute names in HTML

## Tips & Resources

### Performance Tips
- Use `Constructable Stylesheets` instead of `innerHTML` for styles (already implemented)
- Defer heavy operations to `connectedCallback()` (not `constructor()`)
- Remove event listeners in `disconnectedCallback()` to prevent memory leaks

### Browser Support
- **Modern browsers**: Full support (Chrome 67+, Firefox 63+, Safari 13+, Edge 79+)
- **Internet Explorer**: Not supported (consider polyfills if needed)

### Further Learning
- [MDN Web Components Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Web Components Specification](https://html.spec.whatwg.org/multipage/custom-elements.html)
- [Shadow DOM](https://dom.spec.whatwg.org/#shadow-trees)
- [Custom Elements Registry](https://html.spec.whatwg.org/#custom-elements)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy component building!** 🚀
