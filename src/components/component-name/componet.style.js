/** @type {CSSStyleSheet} */
const style = new CSSStyleSheet();
style.replaceSync(/*css*/ `
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    * {
        margin: 0;
        padding: 0;
        color: yellow;
    }
    :host {
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
    font-synthesis: none;
    outline: 2px solid #00FF00;
    }     
    `);

export default style;

/* web-component styles */
