import Queue from 'bull';
import {ExpirationCompletePublisher} from '../events/publishers/expiration-complete-publisher';
import {natsWrapper} from '../nats-wrapper';

interface Payload {
    postId: string;
}

const expirationQueue = new Queue<Payload>('post:expiration', {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

expirationQueue.process(async (job) => {
    await new ExpirationCompletePublisher(natsWrapper.client).publish({
        postId: job.data.postId,
    });
});

export {expirationQueue};
