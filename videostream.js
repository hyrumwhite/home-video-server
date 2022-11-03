import fs from "fs/promises";
import oldFs from "fs";

export const videostream = async (req, res) => {
	let file = req.params.filename;
	const path = `videos/${file}`;
	const stat = await fs.stat(path);
	const videoSize = stat.size;
	const range = req.headers.range;
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-");
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
		const contentLength = end - start + 1;
		const file = oldFs.createReadStream(path, { start, end });
		const head = {
			"Content-Range": `bytes ${start}-${end}/${videoSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": contentLength,
			"Content-Type": "video/mp4",
		};
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			"Content-Length": videoSize,
			"Content-Type": "video/mp4",
		};
		res.writeHead(200, head);
		oldFs.createReadStream(path).pipe(res);
	}
};
