import mongoose from 'mongoose';
const { Schema } = mongoose;

const ClinicSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    address: {
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
export default mongoose.model('Clinic', ClinicSchema);
