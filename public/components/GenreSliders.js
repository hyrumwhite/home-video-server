import { events } from "./events.js";
import { templateQuery } from "../assets/TemplateQuery.js";

let slots = document.querySelectorAll("[slot='GenreSliders']");

const getData = () =>
	new Promise((resolve, reject) => {
		window.setTimeout(() => {
			resolve([
				{
					genre: "Action",
					movies: [
						{ name: "Wolfwalkers", id: "wolfwalkers", thumbnail: true },
						{ name: "Song of the Sea", id: "songofthesea" },
						{ name: "Secret of Kells", id: "secretofkells" },
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
		}, 200);
	});

const handleAnchorClick = ($event) => {
	if (!$event.ctrlKey) {
		events.dispatch(
			"movie-click",
			$event.target.closest("a").getAttribute("key")
		);
		$event.preventDefault();
		$event.stopPropagation();
	}
};

const generateSliders = async (slot) => {
	let genres = await getData();
	let template = document.querySelector("#GenreSliderTemplate");
	for (let genre of genres) {
		let parentEl = template.cloneNode(true);
		let h1 = parentEl.querySelector("h1");
		h1.textContent = genre.genre;
		h1.classList.remove("placeholder");
		let horizontalScroller = parentEl.querySelector(".horizontal-scroller");
		let anchorTemplate = parentEl.querySelector("a");
		for (let movie of genre.movies) {
			let anchor = anchorTemplate.cloneNode(Boolean(movie.thumbnail));
			anchor.href = `/watch/${movie.id}`;
			anchor.setAttribute("key", movie.id);
			anchor.classList.remove("placeholder");
			if (movie.thumbnail) {
				let img = anchor.querySelector("img");
				img.src = `/thumbnails/${movie.id}.jpg`;
				anchor.appendChild(img);
			} else {
				anchor.textContent = movie.name;
			}
			anchor.addEventListener("click", handleAnchorClick);
			horizontalScroller.appendChild(anchor);
		}
		let placeholderAnchors = parentEl.querySelectorAll("a.placeholder");
		for (let anchor of placeholderAnchors) {
			anchor.remove();
		}
		anchorTemplate.remove();
		slot.parentElement.insertBefore(parentEl, slot);
	}
	template.remove();
	slot.remove();
	events.dispatch("genres-loaded");
};

if (slots.length) {
	for (let slot of slots) {
		generateSliders(slot);
	}
}
