import { events } from "./events.js";
let slots = document.querySelectorAll(`[slot="NewMovieList"]`);
/**
 * Populates a UL with movies
 * @param {{detail: FileList}} param0
 */
const createMovieList = ({ detail: movies }) => {
	movies = [...movies];
	let newMovieListItemTemplate = document.querySelector(
		"#NewMovieListItemTemplate"
	);
	for (let movie of movies) {
		let li = newMovieListItemTemplate.content
			.cloneNode(true)
			.querySelector("li");
		if (li) {
			let nameInput = li.querySelector('input[name="name"]');
			let genreInput = li.querySelector('input[name="name"]');
			let tagInput = li.querySelector('input[name="name"]');
			nameInput.value = movie.name;
		}
		for (let slot of slots) {
			slot.appendChild();
		}
	}
};

events.on("movies-selected", ({ detail: movies }) => {
	console.log(movies);
});
