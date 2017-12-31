import mongoose from '../db/connectors';

const phoneSchema = mongoose.Schema(
  {
    countryCode: { type: String, required: true },
    number: { type: String, required: true },
    phonetype: {
      type: String,
      enum: ['WORK', 'HOME'],
      default: 'WORK',
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Phone = mongoose.model('Phone', phoneSchema, 'phones');

export default Phone;
