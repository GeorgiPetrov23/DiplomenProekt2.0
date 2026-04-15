import express from 'express';
import routes from './routes.js';
import handlebarsInit from './config/handlebarsinit.js';
import expressInit from './config/expressInit.js';
import mongooseInit from './config/mongooseInit.js';
import 'dotenv/config';

const app = express();

mongooseInit();
handlebarsInit(app);
expressInit(app);

app.use(routes);

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});