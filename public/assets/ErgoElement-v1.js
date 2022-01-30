export const ErgoElement = (element, keyChar = "") => {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }
  return new Proxy(element, {
    get(target, prop, receiver) {
      if (prop === "self") {
        return target;
      } else if (prop.startsWith(keyChar)) {
        let results = target.querySelectorAll(prop.slice(keyChar.length));
        if (results.length == 1) {
          return results[0];
        } else if (results.length === 0) {
          return null;
        } else {
          return results;
        }
      }
    },
  });
};
