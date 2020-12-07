import { Publisher, Subjects, PersonalDoneEvent } from '@gyan0621/common2';

export class PersonalDonePublisher extends Publisher<PersonalDoneEvent> {
    subject: Subjects.PersonalDone = Subjects.PersonalDone;
}
