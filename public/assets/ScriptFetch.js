export const scriptFetch = (url) =>
  new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = url;
    script.setAttribute("type", "module");
    script.addEventListener("load", ($event) => resolve($event));
    script.addEventListener("error", ($event) => reject($event));
    if (document.head.querySelector(`script[src="${url}"]`) == null) {
      document.head.appendChild(script);
    }
  });
