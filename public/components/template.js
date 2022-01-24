class Template {
  /**
   *
   * @param {HTMLTemplateElement} template
   */
  constructor(template) {
    this.template = template;
  }
  /**
   * Returns a template's Document Fragment
   * @param  {...any} params
   * @returns {DocumentFragment}
   */
  cloneNode() {
    return this.template.content.cloneNode(true);
  }
  /**
   * Returns an element from inside a template's Document Fragment
   * @param {String} selector
   * @returns {HTMLElement}
   */
  querySelector(selector) {
    return this.cloneNode().querySelector(selector);
  }
}

/**
 *
 * @param {String} selector
 * @returns {Template}
 */
export const templateQuery = (selector) => {
  let template = document.querySelector(selector);
  console.log(template);
  return template ? new Template(template) : null;
};
