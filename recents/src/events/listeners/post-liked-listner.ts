import {Message} from 'node-nats-streaming';
import {Listener, PostLikedEvent, Subjects} from '@gyan0621/common2';
import {queueGroupName} from './queue-group-name';

import {tedisClientWrapper } from '../../tedis-client-wrapper'


export class PostLikedListner extends Listener<PostLikedEvent> {
    subject: Subjects.PostLiked = Subjects.PostLiked;
    queueGroupName = queueGroupName;

    async onMessage(data: PostLikedEvent['data'], msg: Message) {
        // add to hash and to newly created queue
        const tedis = tedisClientWrapper.client
        await tedis.hincrby('likes',data.postId,1)
        await tedis.zincrby('ranks',1,data.postId)

        const len = await tedis.zcard('ranks')
        if(len > 100){
            await tedis.zremrangebyrank('ranks',0,0)
        }
        msg.ack()
    }
}
