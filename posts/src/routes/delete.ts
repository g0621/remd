import express, {Request, Response} from 'express';
import {
    NotFoundError,
    requireAuth,
    validateRequest,
    NotAuthorizedError,
    BadRequestError,
} from '@gyan0621/common2';
import {body} from "express-validator";
import {Post} from '../models/post';
import {PostDeletedPublisher} from '../events/publishers/post-deleted-publisher';
import {natsWrapper} from '../nats-wrapper';
import mongoose from "mongoose";

const router = express.Router();

router.delete(
    '/api/posts',
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
        const post = await Post.findById(req.body.id);

        if (!post) {
            throw new NotFoundError();
        }

        if (!post.isActive) {
            throw new BadRequestError('Cannot delete already deleted post');
        }

        if (post.userId !== req.currentUser!.id) {
            throw new NotAuthorizedError();
        }
        post.set({
            isActive: false
        });
        await post.save();
        await new PostDeletedPublisher(natsWrapper.client).publish({
            id: post.id,
            userId: post.userId,
            version: post.version,
        });

        res.send(post);
    }
);

export {router as deletePostRouter};
