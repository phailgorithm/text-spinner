const express = require('express');
const morgan = require('morgan');
const twig = require('twig');
const directus = require('./providers/directus');
const auth = require('./middlewares/auth');
const MarkdownIt = require('markdown-it');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { version } = require('../package.json');

const app = express();
const markdown = new MarkdownIt();

app.use(morgan('dev'));
app.use(express.json());
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(YAML.load('./spec/openapi.yaml'))
);

app.use('/', express.static('/vuepress'));
/*app.get('/', (_, res) =>
  res.status(200).json({ api: 'text-spinner', version: version })
);*/

app.get('/api/v1/spinners/:id', auth, (req, res) => {
  spin(req.params.id, { ...req.query, ...req.body })
    .then((template) => res.send(template))
    .catch((err) => res.status(200).send(''));
});

const rand = (min, max) =>
  Math.abs(Math.floor(Math.sin(Date.now()) * (max - min) + min));

// custom twig filters
twig.extendFilter('spin', (value, separator = ',') => {
  const values = value.split(separator);
  return values[rand(0, values.length - 1)];
});

twig.extendFilter('random', (values, minmax) => {
  if (values === undefined || values.length == 0 || minmax.length < 2)
    return [];

  const result = [];
  const min = minmax[0];
  const max = minmax[1];
  const count = Math.max(1, Math.min(rand(min, max), values.length));

  for (let i = 0; i < count; i++) {
    const idx = rand(0, values.length - 1);
    result.push(values[idx]);
    values.splice(idx, 1);
  }
  return result;
});

const spin = (id, input) =>
  new Promise(async (resolve, reject) => {
    try {
      const spinnerItems = directus.items('spinner');
      const spinnerVariations = directus.items('spinner_variation');

      const spinner = isNaN(Number(id))
        ? (
            await spinnerItems.readByQuery({
              limit: 1,
              filter: {
                name: {
                  _eq: id,
                },
              },
            })
          ).data[0]
        : await spinnerItems.readOne(id, {});

      if (spinner === undefined) return resolve('');
      const variations = await spinnerVariations.readMany(spinner.spinners);

      const items = variations.data;
      const tokenCount = spinner.tokens;
      const condition = !!spinner.condition;

      const output = [];
      for (let i = tokenCount; i > 0; i--) {
        const idx = rand(0, items.length - 1);
        output.push(items[idx]);
        items.splice(idx, 1);
      }

      let preparsed = [];
      for (let elem of output) {
        if (elem.type == 'markdown') {
          preparsed.push(markdown.render(elem.content));
        } else {
          preparsed.push(elem.content);
        }
      }
      preparsed = `{% if (${condition}) %}${preparsed.join(' ')}{% endif %}`;
      resolve(twig.twig({ data: preparsed }).render(input).trim());
    } catch (err) {
      reject(err);
    }
  });

module.exports = app;
