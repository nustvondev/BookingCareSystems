import mongoose from 'mongoose';
const { Schema } = mongoose;

const Doctor_Clinic_SpecialtySchema = new Schema(
  {
    doctorId: {
      type: String,
      require: true,
    },
    clinicId: {
      type: String,
      require: true,
    },
    specialtyId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model(
  'Doctor_Clinic_Specialty',
  Doctor_Clinic_SpecialtySchema
);
