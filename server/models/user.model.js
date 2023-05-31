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
      type: String,
      default: 'O',
    },
    genderData: {
      type: Object,
    },
    image: {
      type: String,
    },
    roleId: {
      type: String,
      default: 'R2',
    },
    positionId: {
      type: String,
    },
    positionData: {
      //Do tự thêm ở ngoài vào hoài nó ko cho nhưng khi bỏ vô đây r thêm nó lại cho
      type: Object,
    },
    specialtyData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('User', UserSchema);
