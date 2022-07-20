import mongoose from "mongoose";

interface CharacterAttrs {
  name: string;
  characterClass?: string;
  level?: number;
  race?: string;
  background?: string;
  lifeStyle?: string;
  faction?: string;
  portrait?: string;
  isPrivate?: boolean;

  userId: string;
}

interface CharacterDoc extends mongoose.Document {
  name: string;
  characterClass?: string;
  level?: number;
  race?: string;
  background?: string;
  lifeStyle?: string;
  faction?: string;
  portrait?: string;
  isPrivate?: boolean;

  userId: string;
}

interface CharacterModel extends mongoose.Model<CharacterDoc> {
  build(attrs: CharacterAttrs): CharacterDoc;
}

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    characterClass: {
      type: String,
    },
    level: {
      type: Number,
    },
    race: {
      type: String,
    },
    background: {
      type: String,
    },
    lifeStyle: {
      type: String,
    },
    faction: {
      type: String,
    },
    portrait: {
      type: String,
    },
    isPrivate: {
      type: Boolean,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

characterSchema.statics.build = (attrs: CharacterAttrs) => {
  return new Character(attrs);
};

const Character = mongoose.model<CharacterDoc, CharacterModel>(
  "Character",
  characterSchema
);

export { Character };
