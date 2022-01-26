import express from "express";
import { videolist } from "./videolist.js";
import { videostream } from "./videostream.js";
import { uploadVideo } from "./uploadVideo.js";
import fileUpload from "express-fileupload";
import { resolve } from "path";

const app = express();

const PORT = 8089;

app.use(fileUpload());

app.post("/video", uploadVideo);
app.get("/video", videolist);
app.get("/video/:filename", videostream);
app.get("/upload", (req, res) => {
  res.sendFile(`${resolve()}/public/upload.html`);
});

app.get("/components/*", express.static("./public"));
app.get("/assets/*", express.static("./public"));
app.get("/css/*", express.static("./public"));
app.get("/html/*", express.static("./public"));
app.get("/thumbnails/*", express.static("./public"));
app.get("*", (req, res) => {
  res.sendFile(`${resolve()}/public/index.html`);
});

app.listen(PORT);
console.info(`Server started on port: ${PORT}`);
