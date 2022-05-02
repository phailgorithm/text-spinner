const http = require("http");
const express = require("express");
const twig = require("twig");
const directus = require("./providers/directus");
const auth = require("./middlewares/auth");
const MarkdownIt = require("markdown-it");

const app = express();
const markdown = new MarkdownIt();

app.use(express.json());
app.get("/text-spinner/:id", auth, (req, res) => {
  spin(req.params.id, req.query)
    .then((template) => res.send(template))
    .catch((err) => res.status(500).send(err));
});

const rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

const spin = (id, input) =>
  new Promise(async (resolve, reject) => {
    try {
      const spinnerItems = directus.items("spinner");
      const spinnerVariations = directus.items("spinner_variation");

      const spinner = await spinnerItems.readOne(id);
      const variations = await spinnerVariations.readMany(spinner.spinners);

      const items = variations.data;
      const tokenCount = spinner.tokens;
      const condition = !!spinner.condition;

      const output = [];
      for (let i = tokenCount; i >= 0; i--) {
        const idx = rand(0, items.length - 1);
        output.push(items[idx]);
        items.splice(idx, 1);
      }

      let preparsed = [];
      for (let elem of output) {
        if (elem.type == "markdown") {
          preparsed.push(markdown.render(elem.content));
        } else {
          preparsed.push(elem.content);
        }
      }
      preparsed = `{% if (${condition}) %}${preparsed.join(" ")}{% endif %}`;
      resolve(twig.twig({ data: preparsed }).render(input));
    } catch (err) {
      reject(err);
    }
  });

http.createServer(app).listen(process.env.PORT || 8080, () => {
  console.log(`server listening on: ${process.env.PORT || 8080}`);
});
