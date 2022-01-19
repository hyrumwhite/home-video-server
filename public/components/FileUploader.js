import { events } from "./events.js";
const fileInput = document.querySelector('.FileUploader input[type="file"]');

if (fileInput) {
	fileInput.addEventListener("change", ($event) => {
		events.dispatch("movies-selected", $event.target.files);
		$event.target.value = null;
	});
}
