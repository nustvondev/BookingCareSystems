import mongoose from 'mongoose';
const { Schema } = mongoose;

const ScheduleSchema = new Schema(
  {
    currentNumber: {
      type: Number,
      require: true,
    },
    maxNumber: {
      type: Number,
      require: true,
      default: 10
    },
    date: {
      type: Date,
      require: true,
    },
    timeType: {
      type: String,
      require: true,
    },
    doctorId: {
      type: String,
      require: true,
    },
    timeTypeData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Schedule', ScheduleSchema);
