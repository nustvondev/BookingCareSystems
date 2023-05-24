import mongoose from 'mongoose';
const { Schema } = mongoose;

const SpecialtySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    descriptionMarkdown: {
      type: String,
    },
    descriptionHTML: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Specialty', SpecialtySchema);
