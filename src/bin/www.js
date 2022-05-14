const http = require('http');
const app = require('../app');

http.createServer(app).listen(process.env.PORT || 3000, () => {
  console.log(`server listening on: ${process.env.PORT || 3000}`);
});
