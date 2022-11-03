import express from "express";
import { videolist } from "./videolist.js";
import { videostream } from "./videostream.js";
// import { uploadVideo } from "./uploadVideo.js";
import { resolve } from "path";
import compression from "compression";
import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import serveStatic from "serve-static";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		if (file.mimetype.includes("video")) {
			cb(null, "./videos");
		} else {
			cb(null, "./images");
		}
	},
	filename: function (req, file, cb) {
		cb(null, `temp-${uuidv4()}.${file.originalname.split(".")[1]}`);
	},
});
const upload = multer({ storage });
const videoUpload = upload.fields([{ name: "video" }, { name: "thumbnail" }]);

const app = express();
// app.use(compression());

const PORT = 8089;

// app.post("/video", videoUpload, uploadVideo);
app.use(serveStatic("./videos"));
app.get("/video", videolist);
app.get("/video/:filename", videostream);
app.get("/upload", (req, res) => {
	res.sendFile(`${resolve()}/public/upload.html`);
});
app.get("/test", (req, res) => {
	res.sendFile(`${resolve()}/public/test.html`);
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
