import { Publisher, Subjects, PostLikedEvent } from '@gyan0621/common2';

export class PostLikedPublisher extends Publisher<PostLikedEvent> {
    subject: Subjects.PostLiked = Subjects.PostLiked
}
