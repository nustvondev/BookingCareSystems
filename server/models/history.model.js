import mongoose from 'mongoose';
const { Schema } = mongoose;

const HistorySchema = new Schema(
  {
    patientId: {
      type: String,
      require: true,
    },
    doctorId: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    files: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('History', HistorySchema);
