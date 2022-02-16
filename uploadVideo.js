import fs from "fs/promises";
import { resolve } from "path";
import r from "rethinkdb";

class Db {
	connection = null;
	constructor(db) {
		r.connect({ host: "localhost", port: 28015, db }, (err, conn) => {
			if (err) {
				throw err;
			}
			this.connection = conn;
		});
	}
	action({ table, method, params }) {
		return new Promise((resolve, reject) => {
			r.table(table)
				[method](params)
				.run(this.connection, (err, result) => {
					if (err) {
						return reject(err);
					}
					resolve(result);
				});
		});
	}
}

// const db = new Db("Media");
export const uploadVideo = async (req, res) => {
	let { tags = [], genres = [] } = req.body;
	tags = tags.split(",").map((tag) => tag.trim());
	genres = genres.split(",").map((tag) => tag.trim());

	let thumbnailExtension = "";
	if (req.files.thumbnail) {
		thumbnailExtension = req.files.thumbnail.filename.split(".")[1] || "";
	}

	try {
		const { generated_keys } = await db.action({
			table: "movies",
			method: "insert",
			params: [
				{
					name: req.body.name,
					genres,
					tags,
					thumbnailExtension: thumbnailExtension,
				},
			],
		});
		for (let key of generated_keys) {
			let [, videoExtension] = req.files.video.filename.split(".");
			let newName = `${key}.${videoExtension || "mp4"}`;
			await fs.rename(
				`${resolve()}/videos/${req.files.video.filename}`,
				`${resolve()}/videos/${newName}`
			);
			if (req.files.thumbnail) {
				let newThumbnailName = `${key}.${thumbnailExtension}`;
				await fs.rename(
					`${resolve()}/videos/${req.files.thumbnail.filename}`,
					`${resolve()}/videos/${newThumbnailName}`
				);
			}
		}
	} catch (e) {
		console.error(e);
	}
	return res.send("success!");
};
