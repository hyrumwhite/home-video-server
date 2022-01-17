import { events } from "./events.js";

events.on("genres-loaded", ($event) => {
  let progress = document.querySelector("#main-progress");
  progress.style.display = "none";
});
