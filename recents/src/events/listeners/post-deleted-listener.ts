import { Message } from 'node-nats-streaming';
import { Listener, PostDeletedEvent, Subjects } from '@gyan0621/common2';
import { queueGroupName } from './queue-group-name';

import {tedisClientWrapper} from "../../tedis-client-wrapper";

export class PostDeletedListener extends Listener<PostDeletedEvent> {
    subject: Subjects.PostDeleted = Subjects.PostDeleted;
    queueGroupName = queueGroupName;

    async onMessage(data: PostDeletedEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving
        const tedis = tedisClientWrapper.client

        await tedis.lrem('newPostList',1,data.id)
        await tedis.hdel('posts',data.id)
        await tedis.zrem('ranks',data.id)

        msg.ack()
    }
}
