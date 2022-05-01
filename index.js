const http = require("http");
const express = require("express");
const twig = require("twig");
const { Directus } = require("@directus/sdk");

const app = express();
const directus = new Directus(process.env.DIRECTUS_URL);

app.use(express.json());
app.get("/text-spinner/:id", async (req, res) => {
  const id = req.params.id;
  const input = req.body; // ideally should not read from BODY in GET request

  const spinnerItems = directus.items("spinner");
  const spinnerVariations = directus.items("spinner_variation");

  const spinner = await spinnerItems.readOne(id);
  const variations = await spinnerVariations.readMany(spinner.spinners);

  const merge = spinner.merge;
  const items = variations.data;
  const tokenCount = spinner.tokens;
  const condition = !!spinner.condition;

  let output = [];
  if (merge) {
    for (let i = tokenCount; i >= 0; i--) {
      const idx = rand(0, items.length - 1);
      output.push(items[idx]);
      items.splice(idx, 1);
    }
  } else {
    output = [items[rand(0, items.length - 1)]];
  }

  let preparsed = [];
  for (let elem of output) {
    // TODO: use markdown parser
    // const contentType = elem["content_type"];
    // let variation = null;
    // if (contentType == "markdown") {
    //   const markdownParser = new Markdown();
    //   variation = markdownParser.text(elem["content"]);
    // } else {
    //   variation = elem["content"];
    // }

    preparsed.push(elem.content);
  }
  preparsed = `{% if (${condition}) %}${preparsed.join(" ")}{% endif %}`;
  return res.status(200).send(twig.twig({ data: preparsed }).render(input));
});

const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

const bootstrap = async () => {
  await directus.auth.login({
    email: process.env.DIRECTUS_EMAIL,
    password: process.env.DIRECTUS_PASS,
  });
};

bootstrap().then(() => {
  http.createServer(app).listen(process.env.PORT || 8080, () => {
    console.log(`server listening on: ${process.env.PORT || 8080}`);
  });
});
