import {
    Subjects,
    Publisher,
    PostExpiredEvent,
} from '@gyan0621/common2';

export class ExpirationCompletePublisher extends Publisher<PostExpiredEvent> {
    subject: Subjects.PostExpired = Subjects.PostExpired;
}
