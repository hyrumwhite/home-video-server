let id = 0;

export const events = {
  callbacks: {},
  on(name, callback) {
    id += 1;
    window.addEventListener(name, callback);
    this.callbacks[id] = { name, callback };
    return id;
  },
  dispatch(name, detail) {
    window.dispatchEvent(new CustomEvent(name, { detail }));
  },
  remove(id) {
    let { name, callback } = this.callbacks[id];
    window.removeEventListener(name, callback);
  },
};
