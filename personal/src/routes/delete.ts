import express, {Request, Response} from 'express';
import {
    NotFoundError,
    requireAuth,
    validateRequest,
    NotAuthorizedError,
    BadRequestError,
} from '@gyan0621/common2';
import {body} from "express-validator";
import {Personal} from '../models/personal';
import {PersonalDeletedPublisher} from '../events/publishers/personal-deleted-publisher';
import {natsWrapper} from '../nats-wrapper';
import mongoose from "mongoose";

const router = express.Router();

router.delete(
    '/api/personal',
    requireAuth,
    [
        body('id')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('Id is empty or invalid')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const personal = await Personal.findById(req.body.id);

        if (!personal) {
            throw new NotFoundError();
        }

        if (!personal.isActive) {
            throw new BadRequestError('Cannot delete already deleted personal item');
        }

        if (personal.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        personal.set({
            isActive: false
        });
        await personal.save();
        await new PersonalDeletedPublisher(natsWrapper.client).publish({
            id: personal.id,
            userId : personal.userId,
            version : personal.version,
            isActive : personal.isActive
        });

        res.send(personal);
    }
);

export {router as deletePersonalRouter};
