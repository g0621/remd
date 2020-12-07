import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@gyan0621/common2';
import {getMostLikedRouter} from "./routes/get-most-liked";
import {getRecentsRouter} from "./routes/get-recents";


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(getMostLikedRouter)
app.use(getRecentsRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
