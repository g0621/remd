import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@gyan0621/common2';
import { Personal } from '../models/personal';
import { PersonalUpdatedPublisher } from '../events/publishers/personal-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/personal',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('link').not().isEmpty().withMessage('Link is required'),
    body('note').not().isEmpty().withMessage('Note is required'),
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

    personal.set({
      title: req.body.title,
      link: req.body.link,
      note : req.body.note
    });
    await personal.save();
    await new PersonalUpdatedPublisher(natsWrapper.client).publish({
      id: personal.id,
      title: personal.title,
      link: personal.link,
      note: personal.note,
      userId: personal.userId,
      version: personal.version,
      isActive: personal.isActive,
      createdAt : personal.createdAt.toString(),
      lastDone : personal.lastDone.toString(),
      nextDo: personal.nextDo.toString(),
      currentCounter : personal.currentCounter
    });

    res.send(personal);
  }
);

export { router as updatePersonalRouter };
