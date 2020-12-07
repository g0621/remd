import express, {Request, Response} from 'express';

import {tedisClientWrapper} from "../tedis-client-wrapper";

const router = express.Router();


router.get(
    '/api/recents/getmostliked',
    async (req: Request, res: Response) => {
        const tedis = tedisClientWrapper.client

        const objs = await tedis.zrevrange('ranks',0,25,'WITHSCORES')
        let toSend: any[] = []

        const populate = async () => {
            for(const [key,value] of Object.entries(objs)){
                let toAdd = JSON.parse(await tedis.hget('posts',key))
                toAdd['likes'] = value
                toSend.push(toAdd)
            }
        }
        await populate()
        res.status(201).send(toSend);
    }
);

export {router as getMostLikedRouter};
