import express, {Request, Response} from 'express';

import {tedisClientWrapper} from "../tedis-client-wrapper";

const router = express.Router();


router.get(
    '/api/recents/getrecents',
    async (req: Request, res: Response) => {
        console.log('getrecents called')
        const tedis = tedisClientWrapper.client
        const posts = await tedis.lrange('newPostList', 0, -1)
        let toSend: any[] = [];
        const populate = async () => {
            for (const post of posts) {
                let obj = JSON.parse(await tedis.hget('posts', post))
                obj['likes'] = await tedis.hget('likes',obj.id) || 0
                toSend.push(obj)
            }
        }
        await populate()
        res.status(201).send(toSend);
    }
);

export {router as getRecentsRouter};
