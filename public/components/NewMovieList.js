import { events } from "./events.js";
import { templateQuery } from "../assets/TemplateQuery.js";
import { formUpload } from "../assets/FormUpload.js";
import { ErgoElement } from "../assets/ErgoElement.js";

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
		let { form, li } = ErgoElement(template.clone());

		form.addEventListener("submit", handleFormSubmit);
		if (li) {
			let nameInput = li`input[name="name"]`;
			nameInput.value = movie.name;
		}
		for (let slot of slots) {
			slot.appendChild(li.self);
		}
	}
};

events.on("movies-selected", createMovieList);
