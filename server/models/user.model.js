import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
    phonenumber: {
      type: String,
      require: true,
    },
    gender: {
      type: Boolean,
    },
    image: {
      type: String,
    },
    roleId: {
      type: String,
      default: '2',
    },
    positionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('User', UserSchema);
