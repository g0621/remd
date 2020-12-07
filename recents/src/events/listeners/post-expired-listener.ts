import { Message } from 'node-nats-streaming';
import { Listener, PostExpiredEvent, Subjects } from '@gyan0621/common2';
import { queueGroupName } from './queue-group-name';

export class PostExpiredListener extends Listener<PostExpiredEvent> {
    subject: Subjects.PostExpired = Subjects.PostExpired;
    queueGroupName = queueGroupName;

    async onMessage(data: PostExpiredEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving

    }
}
