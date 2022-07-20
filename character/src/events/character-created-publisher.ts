import {
  CharacterCreatedEvent,
  Publisher,
  Subjects,
} from "@matyah/dnd-logger-common";

export class CharacterCreatedPublisher extends Publisher<CharacterCreatedEvent> {
  subject: Subjects.characterCreated = Subjects.characterCreated;
}
