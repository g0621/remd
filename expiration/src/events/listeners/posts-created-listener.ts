import { Listener, PostCreatedEvent, Subjects } from '@gyan0621/common2';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';

export class PostsCreatedListener extends Listener<PostCreatedEvent> {
  subject: Subjects.PostCreated = Subjects.PostCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PostCreatedEvent['data'], msg: Message) {
    const delay = 7*24*60*60*1000   //7days
    console.log('Waiting this many milliseconds to process the job:', delay);

    await expirationQueue.add(
      {
        postId: data.id,
      },
      {
        delay,
      }
    );
    msg.ack();
  }
}
