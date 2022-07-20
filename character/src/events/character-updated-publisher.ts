import {
  CharacterUpdatedEvent,
  Publisher,
  Subjects,
} from "@matyah/dnd-logger-common";

export class CharacterUpdatedPublisher extends Publisher<CharacterUpdatedEvent> {
  subject: Subjects.characterUpdated = Subjects.characterUpdated;
}
