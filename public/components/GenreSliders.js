import { events } from "./events.js";
let slots = document.querySelectorAll(".GenreSlidersSlot");

const getData = () =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([
        {
          genre: "Action",
          movies: [
            { name: "Wolfwalkers", id: "wolfwalkers", thumbnail: true },
            { name: "Predator", id: 1235 },
            { name: "Psycho Goreman", id: 1236 },
            { name: "Indiana Jones", id: 12347 },
            { name: "Twilight", id: 1238 },
            { name: "Free Solo", id: 1239 },
            { name: "Shrek", id: 1240 },
          ],
        },
        {
          genre: "Fantasy",
          movies: [
            { name: "Wolfwalkers", id: 1234 },
            { name: "Predator", id: 1235 },
            { name: "Psycho Goreman", id: 1236 },
            { name: "Indiana Jones", id: 12347 },
            { name: "Twilight", id: 1238 },
            { name: "Free Solo", id: 1239 },
            { name: "Shrek", id: 1240 },
          ],
        },
      ]);
    }, 300);
  });

const handleAnchorClick = ($event) => {
  if (!$event.ctrlKey) {
    events.dispatch("movie-click", $event.target.getAttribute("key"));
    $event.preventDefault();
    $event.stopPropagation();
  }
};

const generateSliders = async (slot) => {
  let genres = await getData();
  for (let genre of genres) {
    let nav = document.createElement("nav");
    nav.className = "GenreSlider";
    let h1 = document.createElement("h1");
    h1.textContent = genre.genre;
    let scrollContainer = document.createElement("div");
    scrollContainer.className = "horizontal-scroller";
    for (let movie of genre.movies) {
      let anchor = document.createElement("a");
      anchor.href = `/watch/${movie.id}`;
      anchor.setAttribute("key", movie.id);
      if (movie.thumbnail) {
        let img = document.createElement("img");
        img.src = `/thumbnails/${movie.id}.jpg`;
        img.setAttribute("loading", "lazy");
        img.setAttribute("intrinsicsize", "100 x 150");
        anchor.appendChild(img);
      } else {
        anchor.textContent = movie.name;
      }
      scrollContainer.appendChild(anchor);
      anchor.addEventListener("click", handleAnchorClick);
    }
    nav.appendChild(h1);
    nav.appendChild(scrollContainer);
    slot.parentElement.insertBefore(nav, slot);
  }
  slot.remove();
  events.dispatch("genres-loaded");
};

if (slots.length) {
  for (let slot of slots) {
    generateSliders(slot);
  }
}
