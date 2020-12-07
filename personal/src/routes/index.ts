import express, {Request, Response} from 'express';
import {Personal} from '../models/personal';
import {requireAuth} from '@gyan0621/common2';

const router = express.Router();

router.get('/api/personal',
    requireAuth,
    async (req: Request, res: Response) => {
        const posts = await Personal.find({isActive: true, userId: req.currentUser!.id});
        res.send(posts);
    });

export {router as indexPersonalRouter};
