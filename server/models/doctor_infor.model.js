import mongoose from 'mongoose';
const { Schema } = mongoose;

const doctor_inforSchema = new Schema(
  {
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
    priceId: {
      type: String,
      require: true,
    },
    provinceId: {
      type: String,
      require: true,
    },
    paymentId: {
      type: String,
      require: true,
    },
    addressClinic: {
      type: String,
    },
    nameClinic: {
      type: String,
    },
    note: {
      type: String,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Doctor_Infor', doctor_inforSchema);
