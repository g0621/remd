import { app } from './app';
import {tedisClientWrapper} from './tedis-client-wrapper'
import {natsWrapper} from './nats-wrapper'

import {PostCreatedListener} from "./events/listeners/post-created-listener";
import {PostUpdatedListener} from "./events/listeners/post-updated-listener";
import {PostDeletedListener} from "./events/listeners/post-deleted-listener";
import {PostLikedListner} from "./events/listeners/post-liked-listner";

const start = async () => {

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }
    if (!process.env.REDIS_HOST) {
        throw new Error('REDIS_HOST must be defined');
    }
    if (!process.env.REDIS_PORT) {
        throw new Error('REDIS_PORT must be defined');
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );
        const port = parseInt(process.env.REDIS_PORT!) || 6379
        const host = process.env.REDIS_HOST || 'localhost'
        await tedisClientWrapper.connect(port, host)
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());
        new PostCreatedListener(natsWrapper.client).listen()
        new PostUpdatedListener(natsWrapper.client).listen()
        new PostDeletedListener(natsWrapper.client).listen()
        new PostLikedListner(natsWrapper.client).listen()
    } catch (e) {

    }
    app.listen(3000, () => {
      console.log('Listening on port 3000!!!!!!!!');
    });
};

start();
