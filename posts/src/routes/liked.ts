import express, {Request, Response} from 'express';
import {
    NotFoundError,
    requireAuth,
    validateRequest,
    BadRequestError,
} from '@gyan0621/common2';
import {body} from "express-validator";
import {Post} from '../models/post';
import {natsWrapper} from '../nats-wrapper';
import {PostLikedPublisher} from "../events/publishers/post-liked-publisher";
import mongoose from "mongoose";

const router = express.Router();

router.put(
    '/api/posts/liked',
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
            throw new BadRequestError('Cannot like already deleted post');
        }
        await new PostLikedPublisher(natsWrapper.client).publish({
            postId : post.id
        });
        res.send({});
    }
);

export {router as likePostRouter};
