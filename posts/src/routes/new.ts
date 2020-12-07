import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@gyan0621/common2';
import { Post } from '../models/post';
import { PostCreatedPublisher } from '../events/publishers/post-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/posts',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('link').not().isEmpty().withMessage('Link is required'),
    body('about').not().isEmpty().withMessage('About is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let { title, link, about } = req.body;
    link = link.toLowerCase()
    if(!link.startsWith('http')) link = 'https://' + link

    const post = Post.build({
      title,
      link,
      about,
      isActive : true,
      userId: req.currentUser!.id,
    });
    await post.save();
    await new PostCreatedPublisher(natsWrapper.client).publish({
      id: post.id,
      title: post.title,
      link: post.link,
      about: post.about,
      userId: post.userId,
      version: post.version,
      isActive: post.isActive
    });

    res.status(201).send(post);
  }
);

export { router as createPostRouter };
