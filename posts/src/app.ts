import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler, NotFoundError, currentUser} from '@gyan0621/common2';
import {createPostRouter} from './routes/new';
import {showPostRouter} from './routes/show';
import {indexPostRouter} from './routes/index';
import {updatePostRouter} from './routes/update';
import {deletePostRouter} from './routes/delete';
import {likePostRouter} from "./routes/liked";

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use(currentUser);

app.use(likePostRouter);
app.use(deletePostRouter);
app.use(createPostRouter);
app.use(showPostRouter);
app.use(indexPostRouter);
app.use(updatePostRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};
