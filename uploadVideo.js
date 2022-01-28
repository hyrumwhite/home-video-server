import fs from "fs/promises";
// import r from "rethinkdb";

// class Db {
// 	connection = null;
// 	constructor(db) {
// 		r.connect({ host: "localhost", port: 28015, db }, (err, conn) => {
// 			if (err) {
// 				throw err;
// 			}
// 			this.connection = conn;
// 		});
// 	}
// 	action({ table, method, params }) {
// 		return new Promise((resolve, reject) => {
// 			r.table(table)
// 				[method](params)
// 				.run(this.connection, (err, result) => {
// 					if (err) {
// 						return reject(err);
// 					}
// 					resolve(result);
// 				});
// 		});
// 	}
// }

// const db = new Db("Media");
export const uploadVideo = async (req, res) => {
	// try {
	// 	const { generated_keys } = await db.action({
	// 		table: "movies",
	// 		method: "insert",
	// 		params: [
	// 			{
	// 				name: req.files.name,
	// 				genre: req.files.genre,
	// 				tags: req.files.tags,
	// 			},
	// 		],
	// 	});
	// 	for (let key of generated_keys) {
	// 		await fs.writeFile(`${__dirname}/videos/${key}.mp4`, req.files.video);
	// 		if (req.files.thumbnail) {
	// 			await fs.writeFile(
	// 				`${__dirname}/thumbnails/${key}.mp4`,
	// 				req.files.thumbnail
	// 			);
	// 		}
	// 	}
	// } catch (e) {
	// 	console.error(e);
	// }
	console.log(req.files);
	// await fs.writeFile(`videos/${req.body.name}.mp4`, req.files.video.data);
	// console.log("made it here!!");
	// if (req.files.thumbnail) {
	// 	await fs.writeFile(
	// 		`${__dirname}/thumbnails/${key}.mp4`,
	// 		req.files.thumbnail
	// 	);
	// }
	return res.send("success!");
};
