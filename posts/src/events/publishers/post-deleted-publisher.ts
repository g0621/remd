import { Publisher, Subjects, PostDeletedEvent } from '@gyan0621/common2';

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
    subject: Subjects.PostDeleted = Subjects.PostDeleted;
}
