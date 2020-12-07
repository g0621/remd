import { Publisher, Subjects, PersonalDeletedEvent } from '@gyan0621/common2';

export class PersonalDeletedPublisher extends Publisher<PersonalDeletedEvent> {
    subject: Subjects.PersonalDeleted = Subjects.PersonalDeleted
}
