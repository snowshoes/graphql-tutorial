import mongoose from '../db/connectors';

const userSchema = mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
