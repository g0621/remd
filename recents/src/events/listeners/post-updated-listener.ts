import { Message } from 'node-nats-streaming';
import { Listener, PostUpdatedEvent, Subjects } from '@gyan0621/common2';
import { queueGroupName } from './queue-group-name';

import {tedisClientWrapper} from "../../tedis-client-wrapper";

export class PostUpdatedListener extends Listener<PostUpdatedEvent> {
    subject: Subjects.PostUpdated = Subjects.PostUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: PostUpdatedEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving

        const tedis = tedisClientWrapper.client
        await tedis.hset('posts',data.id,JSON.stringify(data))
        msg.ack()
    }
}
