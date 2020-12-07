import { Publisher, Subjects, PostUpdatedEvent } from '@gyan0621/common2';

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
  subject: Subjects.PostUpdated = Subjects.PostUpdated;
}
