import {Message} from 'node-nats-streaming';
import {Listener, PostCreatedEvent, Subjects} from '@gyan0621/common2';
import {queueGroupName} from './queue-group-name';

import {tedisClientWrapper } from '../../tedis-client-wrapper'


export class PostCreatedListener extends Listener<PostCreatedEvent> {
    subject: Subjects.PostCreated = Subjects.PostCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PostCreatedEvent['data'], msg: Message) {
        // add to hash and to newly created queue
        const tedis = tedisClientWrapper.client
        await tedis.hset('posts',data.id,JSON.stringify(data))
        await tedis.hset('likes',data.id,0)
        await tedis.zincrby('ranks',0,data.id)
        const listLen = await tedis.llen('newPostList')
        if(listLen > 24){
            await tedis.rpop('newPostList')
        }
        await tedis.lpush('newPostList',data.id)
        msg.ack()
    }
}
