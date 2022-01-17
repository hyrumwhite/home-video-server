import { events } from "./events.js";

const videoEl = document.querySelector("#VideoPlayer");

const pauseVideo = ($event) => {
  console.log($event);
  if ($event.target != document.fullscreenElement) {
    videoEl.pause();
    videoEl.removeEventListener("fullscreenchange", pauseVideo);
  }
};

const setVideoSource = async (url) => {
  const source = videoEl.querySelector("source");
  source.setAttribute("src", url);
  await videoEl.requestFullscreen();
  videoEl.load();
  videoEl.play();
  videoEl.addEventListener("fullscreenchange", pauseVideo);
};

events.on("movie-click", ({ detail: movieId }) => {
  setVideoSource(`http://10.0.0.16:8089/video/${movieId}.mp4`);
});
