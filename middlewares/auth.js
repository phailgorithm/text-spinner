const directus = require('../providers/directus');

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send('No credentials sent. User header Authorization: Bearer <token>');
  }
  const header = req.headers.authorization.split(' ');
  if (header.length != 2 || header[0] !== 'Bearer') {
    return res
      .status(422)
      .send('Invalid auth header format. Should be: Bearer <token>');
  }

  const token = header[1];
  directus.auth
    .static(token)
    .then((authenticated) =>
      authenticated ? next() : res.status(403).send('Forbidden')
    )
    .catch((err) => res.status(500).send(err));
};

module.exports = auth;
