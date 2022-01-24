import { events } from "./events.js";
import { templateQuery } from "./template.js";
let slots = document.querySelectorAll(`[slot="NewMovieList"]`);
/**
 * Populates a UL with movies
 * @param {{detail: FileList}} param0
 */
const createMovieList = ({ detail: movies }) => {
  movies = [...movies];
  let template = templateQuery("#NewMovieListItemTemplate");
  for (let movie of movies) {
    let li = template.querySelector("li");
    if (li) {
      let nameInput = li.querySelector('input[name="name"]');
      let genreInput = li.querySelector('input[name="genres"]');
      let tagInput = li.querySelector('input[name="tags"]');
      nameInput.value = movie.name;
    }
    for (let slot of slots) {
      slot.appendChild(li);
    }
  }
};

events.on("movies-selected", createMovieList);
