export const templateFetch = async (url, fetchParams = {}) => {
  let response = await fetch(url, fetchParams);
  if (response.ok) {
    let template = await response.text();
    let domParser = new DOMParser();
    let document = domParser.parseFromString(template, "text/html");
    let head = document.querySelector("head");
    let body = document.querySelector("body");
    let parts = {};
    if (body.children.length == 0) {
      parts.template = body.children[0];
    } else {
      parts.template = [...body.children];
    }
    let headChildren = [...head.children];
    parts.head = headChildren.filter(
      ({ nodeName }) =>
        nodeName === "STYLE" || nodeName === "SCRIPT" || nodeName === "LINK"
    );
    return parts;
  }
};

export const applyHead = (children) => {
  for (let child of children) {
    if (child.nodeName === "SCRIPT") {
      let src = child.getAttribute("src");
      if (document.head.querySelector(`[src="${src}"]`) == null) {
        let script = document.createElement("script");
        for (let attribute of child.attributes) {
          script.setAttribute(attribute.name, attribute.value);
        }
        document.head.appendChild(script);
      }
    } else {
      let href = child.getAttribute("href");
      if (document.head.querySelector(`[href="${href}"]`) == null) {
        document.head.appendChild(child);
      }
    }
  }
};
