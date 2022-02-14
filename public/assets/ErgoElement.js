export const ArrayProxy = function (array) {
  return new Proxy(array, {
    set(target, property, value, receiver) {
      if (property in target) {
        Reflect.set(target, property, value, receiver);
      } else {
        for (let item of target) {
          item[property] = value;
        }
      }
      return true;
    },
    get(target, property, receiver) {
      console.log(property);
      if (property in target) {
        let value = target[property];
        return typeof value === "function" ? value.bind(target) : value;
      } else {
        let collection = [];
        let firstItem = target[0];
        if (firstItem && typeof firstItem[property] === "function") {
          return (...params) => {
            for (let i = 0; i < target.length; i++) {
              let item = target[i];
              let fn = item[property].bind(item);
              if (typeof params[0] === "function") {
                let functionResponse = params[0](i, ...params.slice(1), item);
                if (functionResponse instanceof Array) {
                  fn(...functionResponse);
                } else {
                  fn(functionResponse);
                }
              } else {
                item[property](...params);
              }
            }
          };
        }
        for (let item of target) {
          let value = item[property];
          collection.push(
            typeof value === "function" ? value.bind(target) : value
          );
        }
        return ArrayProxy(collection);
      }
    },
  });
};

export const ErgoElement = function (
  element,
  { prefix = "$", emitInputOnValueChange = true } = {}
) {
  if (typeof element === "string") {
    element = document.querySelector(element);
  }

  function getElement(selector, group) {
    if (group) {
      let results = element.querySelectorAll(selector);
      return ArrayProxy(results);
    } else {
      let result = element.querySelector(selector);
      return result ? ErgoElement(result) : null;
    }
  }

  return new Proxy(getElement, {
    get(target, prop, receiver) {
      let value = element[prop];
      if (prop === "self") {
        return element;
      } else if (typeof value === "function") {
        return value.bind(element);
      } else if (prop in element) {
        return element[prop];
      } else {
        console.log(prop);
        if (prop && prop.startsWith && prop.startsWith(prefix)) {
          prop = prop.slice(prefix.length);
          return target(prop, true);
        }
        return target(prop);
      }
    },
    set(target, prop, value) {
      element[prop] = value;
      if (prop === "value" && emitInputOnValueChange) {
        element.dispatchEvent(new CustomEvent("input", { detail: value }));
      }
      return true;
    },
    apply(target, thisArg, args) {
      return target.apply(thisArg, args);
    },
  });
};
