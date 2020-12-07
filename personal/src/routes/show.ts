import express, {Request, Response} from 'express';
import {NotFoundError} from '@gyan0621/common2';
import {Personal} from '../models/personal';
import {requireAuth,NotAuthorizedError} from '@gyan0621/common2';


const router = express.Router();

router.get('/api/personal/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const personal = await Personal.findById(req.params.id);
        if (!personal) {
            throw new NotFoundError();
        }
        if (personal.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        res.send(personal);
    });

export {router as showPersonalRouter};
