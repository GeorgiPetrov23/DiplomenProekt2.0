import express from 'express';
import routes from './routes.js';
import handlebarsInit from './config/handlebarsinit.js';

const app = express();

handlebarsInit(app);
expressInit(app);

app.use(routes);

app.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});