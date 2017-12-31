import mongoose from '../db/connectors';

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: false },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

// email unique validation check
userSchema.path('email').validate({
  isAsync: true,
  validator(value, respond) {
    this.model('user').count({ email: value }, (err, count) => {
      if (err) {
        return respond(err);
      }
      respond(!count);
    });
  },
  message: 'Email already exists'
});

const userModel = mongoose.model('user', userSchema);

export default userModel;
