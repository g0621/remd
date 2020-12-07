import { Publisher, Subjects, PersonalUpdatedEvent } from '@gyan0621/common2';

export class PersonalUpdatedPublisher extends Publisher<PersonalUpdatedEvent> {
  subject: Subjects.PersonalUpdated = Subjects.PersonalUpdated;
}
