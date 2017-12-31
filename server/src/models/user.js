import mongoose from '../db/connectors';
import Phone from './phone';

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: false },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: { type: String, required: true },
    // /!\ order matters! 1.ref 2.type
    // https://stackoverflow.com/questions/26511604/adding-field-in-mongoose-plugin-gives-typeerror-invalid-value-for-schema-path
    phones: [{ ref: 'Phone', type: mongoose.Schema.Types.ObjectId }]
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
    this.model('User').count({ email: value }, (err, count) => {
      if (err) {
        return respond(err);
      }
      respond(!count);
    });
  },
  message: 'Email already exists'
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
