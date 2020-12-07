import express, {Request, Response} from 'express';
import {body} from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError,
    BadRequestError,
} from '@gyan0621/common2';
import {Personal} from '../models/personal';
import {natsWrapper} from '../nats-wrapper';
import {PersonalUpdatedPublisher} from "../events/publishers/personal-updated-publisher";

const router = express.Router();

router.put(
    '/api/personal/reset',
    requireAuth,
    [
        body('id').not().isEmpty().withMessage('Id is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const personal = await Personal.findById(req.body.id);

        if (!personal) {
            throw new NotFoundError();
        }

        if (!personal.isActive) {
            throw new BadRequestError('Cannot update deleted personal item');
        }

        if (personal.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        const current: Date = new Date()
        const nextDo = new Date(current.getTime() + 86400000)

        personal.set({
            lastDone : current,
            nextDo: nextDo,
            currentCounter : 1
        });
        await personal.save();
        new PersonalUpdatedPublisher(natsWrapper.client).publish({
            id: personal.id,
            title: personal.title,
            link: personal.link,
            note: personal.note,
            userId: personal.userId,
            version: personal.version,
            isActive: personal.isActive,
            createdAt: personal.createdAt.toString(),
            lastDone: personal.lastDone.toString(),
            nextDo: personal.nextDo.toString(),
            currentCounter: personal.currentCounter
        });
        res.send(personal);
    }
);

export {router as resetPersonalRouter};
