import fs from "fs/promises";
import oldFs from "fs";

export const videostream = async (req, res) => {
	let file = req.params.filename;
	const path = `videos/${file}`;
	const stat = await fs.stat(path);
	const fileSize = stat.size;
	const range = req.headers.range;
	if (range) {
		const parts = range.replace(/bytes=/, "").split("-");
		const start = parseInt(parts[0], 10);
		const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
		const chunksize = end - start + 1;
		const file = oldFs.createReadStream(path, { start, end });
		const head = {
			"Content-Range": `bytes ${start}-${end}/${fileSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": chunksize,
			"Content-Type": "video/mp4",
		};
		res.writeHead(206, head);
		file.pipe(res);
	} else {
		const head = {
			"Content-Length": fileSize,
			"Content-Type": "video/mp4",
		};
		res.writeHead(200, head);
		oldFs.createReadStream(path).pipe(res);
	}
};
