require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const router = require('./routes/index');
const { errorHandler } = require('./helpers/errorHandler');
const { limiter } = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { allowedCorsMiddleware } = require('./middlewares/allowedCors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors(allowedCorsMiddleware));
app.use(requestLogger);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
