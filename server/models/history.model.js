import mongoose from 'mongoose';
const { Schema } = mongoose;

const HistorySchema = new Schema(
  {
    patientId: {
      type: String,
      require: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
