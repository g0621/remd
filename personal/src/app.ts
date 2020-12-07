import express from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import cookieSession from 'cookie-session';
import {errorHandler, NotFoundError, currentUser} from '@gyan0621/common2';
import {createPersonalRouter} from './routes/new';
import {showPersonalRouter} from './routes/show';
import {indexPersonalRouter} from './routes/index';
import {updatePersonalRouter} from './routes/update';
import {deletePersonalRouter} from './routes/delete';
import {donePersonalRouter} from "./routes/done";
import {resetPersonalRouter} from "./routes/reset";

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

app.use(resetPersonalRouter);
app.use(donePersonalRouter);
app.use(deletePersonalRouter);
app.use(createPersonalRouter);
app.use(indexPersonalRouter);
app.use(updatePersonalRouter);
app.use(showPersonalRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export {app};
