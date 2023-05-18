import mongoose from 'mongoose';
const { Schema } = mongoose;

const MarkdownSchema = new Schema(
  {
    contentHtml: {
      type: String,
      maxlength: 5000,
      require: true,
    },
    contentMarkdown: {
      type: String,
      maxlength: 5000,
      require: true,
    },
    description: {
      type: String,
      maxlength: 5000,
    },
    doctorId: {
      type: String,
      require: true,
    },
    specialtyId: {
      type: String,
    },
    clinicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Markdown', MarkdownSchema);
