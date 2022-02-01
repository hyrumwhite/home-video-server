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
		},
		get(target, property, receiver) {
			if (property in target) {
				let value = target[property];
				return typeof value === "function" ? value.bind(target) : value;
			} else {
				let collection = [];
				let firstItem = target[0];
				if (firstItem && typeof firstItem[property] === "function") {
					return (...params) => {
						for (let item of target) {
							item[property](...params);
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

export const ErgoElement = function (element) {
	if (typeof element === "string") {
		document.querySelector(element);
	}

	function getElement(selector) {
		let results = element.querySelectorAll(selector);
		if (results.length == 1) {
			return ErgoElement(results[0]);
		} else if (results.length === 0) {
			return null;
		} else {
			return ArrayProxy(results);
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
				if (prop.startsWith("$")) {
					prop = prop.slice(1);
				}
				return target(prop);
			}
		},
		apply(target, thisArg, args) {
			return target.apply(thisArg, args);
		},
	});
};
