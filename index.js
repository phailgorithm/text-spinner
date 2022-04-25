const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).json({ foo: "bar" });
});

http.createServer(app).listen(process.env.PORT || 8080, () => {
  console.log(`server listening on: ${process.env.PORT || 8080}`);
});
