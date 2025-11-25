/**
 * @type {HTMLTemplateElement}
 */
const componentNameTemplate = document.createElement("template");
componentNameTemplate.innerHTML = /* html */ `
    <div>
        <h1>MY COMPONENT</h1>
        <slot></slot>
    </div>
`;
export default componentNameTemplate;
