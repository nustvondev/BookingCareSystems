import express from 'express';
import { connect } from './config/connectDB.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { initWebRouters } from './routes/index.router.js';
import { configViewEngine } from './config/viewEngine.js';
import { setMiddleWare } from './middleware/middleware.js';
import { migration } from './config/migration.js';
const app = express();
dotenv.config();

// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
setMiddleWare(app);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

configViewEngine(app);
initWebRouters(app);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Some thing went wrong!';
  const errObject = {
    errCode: errorStatus,
    message: errorMessage,
  };
  return res.status(errorStatus).send(errObject);
});

app.listen(process.env.BACKEND_PORT || 8080, async () => {
  await connect();
  console.log('backend is running http://localhost:8080/');
  migration();
});
