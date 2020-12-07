import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@gyan0621/common2';
import { Personal } from '../models/personal';
import { PersonalCreatedPublisher } from '../events/publishers/personal-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/personal',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('link').not().isEmpty().withMessage('Link is required'),
    body('note').not().isEmpty().withMessage('Note is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let { title, link, note } = req.body;
    link = link.toLowerCase()
    if(!link.startsWith('http')) link = 'https://' + link

    const createdAt = new Date()
    const lastDone = createdAt
    const nextDo = new Date(createdAt.getTime() + 86400000)
    const currentCounter = 1

    const personal = Personal.build({
      title,
      link,
      note,
      createdAt,
      lastDone,
      nextDo,
      currentCounter,
      isActive : true,
      userId: req.currentUser!.id,
    });
    await personal.save();
    await new PersonalCreatedPublisher(natsWrapper.client).publish({
      id: personal.id,
      title: personal.title,
      link: personal.link,
      note: personal.note,
      userId: personal.userId,
      version: personal.version,
      isActive: personal.isActive,
      createdAt : personal.createdAt.toString(),
      lastDone : personal.lastDone.toString(),
      currentCounter : personal.currentCounter,
      nextDo: personal.nextDo.toString()
    });

    res.status(201).send(personal);
  }
);

export { router as createPersonalRouter };
