const express = require("express");
const app = express();

app.get("/watch/:id", (req, res) => {
  res.sendFile(`${__dirname}/public/watch.html`);
});
app.get("*", express.static("./public"));

const PORT = 8090;

app.listen(PORT);

console.info(`Server running on port: ${PORT}`);
console.info(`URL: http://localhost:${PORT}`);
