import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema(
  {
    statusId: {
      type: String,
      require: true,
    },
    doctorId: {
      type: String,
      require: true,
    },
    patientId: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    timeType: {
      type: String,
    },
    content: {
      type: String,
    },
    doe: {
      type: Date,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Booking', BookingSchema);
