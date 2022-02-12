import { events } from "./events.js";
import { templateQuery } from "../assets/TemplateQuery.js";
import { formUpload } from "../assets/FormUpload.js";
import { ErgoElement } from "../assets/ErgoElement.js";

let slots = document.querySelectorAll(`[slot="NewMovieList"]`);

const handleFormSubmit = async ($event) => {
  $event.preventDefault();
  let form = $event.target;
  let formData = new FormData(form);
  formData.append("video", form.video);
  formUpload({
    url: form.action,
    method: form.method,
    formData,
    onUploadProgress(progress) {
      console.log(progress);
    },
  });
};

const displayThumbnail = ($event) => {
  let { files } = $event.target;
  let imgFile = files[0];
  if (imgFile) {
    const reader = new FileReader();
    let { img } = ErgoElement($event.target.closest("label"));
    reader.addEventListener("load", ({ target }) => {
      img.src = target.result;
      img.style.display = null;
    });
    reader.readAsDataURL(imgFile);
  }
};

/**
 * Populates a UL with movies
 * @param {{detail: FileList}} param0
 */
const createMovieList = ({ detail: movies }) => {
  movies = [...movies];
  let template = templateQuery("#NewMovieListItemTemplate");
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    let { form, li } = ErgoElement(template.clone());
    form.video = movie;
    form.setAttribute("name", `movie-${i}`);
    form.addEventListener("submit", handleFormSubmit, { capture: true });
    let { 'input[name="thumbnail"]': thumbnailInput } = form;
    thumbnailInput.addEventListener("change", displayThumbnail);
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
