import { Publisher, Subjects, PostCreatedEvent } from '@gyan0621/common2';

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
  subject: Subjects.PostCreated = Subjects.PostCreated
}
