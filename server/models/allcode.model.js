import mongoose from 'mongoose';
const { Schema } = mongoose;

const AllcodeSchema = new Schema(
  {
    keyMap: {
      type: String,
      require: true,
      unique: true,
    },
    type: {
      type: String,
      require: true,
    },
    valueEn: {
      type: String,
      require: true,
    },
    valueVi: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Allcode', AllcodeSchema);
