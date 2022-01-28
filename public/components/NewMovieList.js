import { events } from "./events.js";
import { templateQuery } from "../assets/TemplateQuery.js";
import { formUpload } from "../assets/FormUpload.js";
let slots = document.querySelectorAll(`[slot="NewMovieList"]`);

const handleFormSubmit = async ($event) => {
	let form = $event.target;
	let formData = new FormData(form);
	await formUpload({
		url: form.action,
		method: form.method,
		formData,
		onUploadProgress(progress) {
			console.log(progress);
		},
	});
	$event.preventDefault();
};

/**
 * Populates a UL with movies
 * @param {{detail: FileList}} param0
 */
const createMovieList = ({ detail: movies }) => {
	movies = [...movies];
	let template = templateQuery("#NewMovieListItemTemplate");
	for (let movie of movies) {
		let templateClone = template.cloneNode();
		let form = templateClone.querySelector("form");
		form.addEventListener("submit", handleFormSubmit);
		let li = templateClone.querySelector("li");
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
