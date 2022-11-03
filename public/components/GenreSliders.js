import { events } from "./events.js";
import { templateQuery } from "../assets/TemplateQuery.js";
import { ErgoElement } from "../assets/ErgoElement.min.js";

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
						{ name: "The Bad Guys", id: "badguys.m4v", thumbnail: true },
						{
							name: "peculiarchildren",
							id: "peculiarchildren",
							thumbnail: false,
						},
						{ name: "HTTYD2", id: "howtotrainyourdragon2", thumbnail: true },
						{
							name: "Pirates of the Carribean",
							id: "piratesofthecarribean",
							thumbnail: true,
						},
						{
							name: "The Lego Movie",
							id: "legomovie",
							thumbnail: true,
						},
						{ name: "Barbie: Pink Shoes", id: "barbieinthepinkshoes" },
						{ name: "Interstellar", id: "interstellar" },
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
		let {
			self: nav,
			h1,
			".horizontal-scroller": horizontalScroller,
			"a:first-child": firstAnchor,
			"$a.placeholder": placeholders,
		} = ErgoElement(template.cloneNode(true));

		h1.textContent = genre.genre;
		h1.classList.remove("placeholder");

		for (let movie of genre.movies) {
			let anchor = firstAnchor.cloneNode(Boolean(movie.thumbnail));
			anchor.href = `/watch/${movie.id}`;
			anchor.setAttribute("key", movie.id);
			anchor.classList.remove("placeholder");
			if (movie.thumbnail) {
				let img = anchor.querySelector("img");
				img.src = `/thumbnails/${movie.id.split(".")[0]}.jpg`;
				anchor.appendChild(img);
			} else {
				anchor.textContent = movie.name;
			}
			anchor.addEventListener("click", handleAnchorClick);
			horizontalScroller.appendChild(anchor);
		}
		placeholders.remove();
		slot.parentElement.insertBefore(nav, slot);
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
