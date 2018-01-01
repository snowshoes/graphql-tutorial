import mongoose from '../db/connectors';

const profileSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: false
    },
    gender: {
      type: String,
      required: false
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Profile = mongoose.model('Profile', profileSchema, 'profile');

export default Profile;
