import { Publisher, Subjects, PersonalCreatedEvent } from '@gyan0621/common2';

export class PersonalCreatedPublisher extends Publisher<PersonalCreatedEvent> {
  subject: Subjects.PersonalCreated = Subjects.PersonalCreated
}
