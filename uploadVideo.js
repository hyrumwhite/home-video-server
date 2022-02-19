import fs from "fs/promises";
import { resolve } from "path";

import { mediaDB } from "./dbConnections.js";

export const uploadVideo = async (req, res) => {
  let { tags = [], genres = [] } = req.body;
  tags = tags.split(",").map((tag) => tag.trim());
  genres = genres.split(",").map((tag) => tag.trim());

  let thumbnailExtension = "";
  if (req.files.thumbnail) {
    thumbnailExtension = req.files.thumbnail.filename.split(".")[1] || "";
  }

  try {
    const { generated_keys } = await mediaDB.run({
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
