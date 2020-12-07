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
import {PersonalDonePublisher} from "../events/publishers/personal-done-publisher";

const router = express.Router();

router.put(
    '/api/personal/done',
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

        let afterDays: number = personal.currentCounter + 2
        let nextDo: Date = personal.nextDo
        const current: Date = new Date()
        if(current > nextDo){
            afterDays = 1
        }
        nextDo = new Date(current.getTime() + afterDays*86400000)

        personal.set({
            lastDone : current,
            nextDo: nextDo,
            currentCounter : afterDays
        });
        await personal.save();
        new PersonalDonePublisher(natsWrapper.client).publish({
            id: personal.id,
            isDone : true,
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

export {router as donePersonalRouter};
