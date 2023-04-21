import express from 'express';
import { connect } from './config/connectDB.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { initWebRouters } from './routes/index.router.js';
import { configViewEngine } from './config/viewEngine.js';
const app = express();
dotenv.config();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRouters(app);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Some thing went wrong!';
  return res.status(errorStatus).send(errorMessage);
});

app.listen(process.env.BACKEND_PORT || 8080, () => {
  connect();
  console.log('backend is running http://localhost:8080/');
});
