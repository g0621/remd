import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from '@gyan0621/common2';
import { Post } from '../models/post';
import { PostUpdatedPublisher } from '../events/publishers/post-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/posts',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('link').not().isEmpty().withMessage('Link is required'),
    body('about').not().isEmpty().withMessage('About is required'),
    body('id').not().isEmpty().withMessage('Id is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const post = await Post.findById(req.body.id);

    if (!post) {
      throw new NotFoundError();
    }

    if (!post.isActive) {
      throw new BadRequestError('Cannot update deleted post');
    }

    if (post.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    post.set({
      title: req.body.title,
      link: req.body.link,
      about : req.body.about
    });
    await post.save();
    await new PostUpdatedPublisher(natsWrapper.client).publish({
      id: post.id,
      title: post.title,
      link : post.link,
      about : post.about,
      userId: post.userId,
      version: post.version,
      isActive : post.isActive
    });

    res.send(post);
  }
);

export { router as updatePostRouter };
