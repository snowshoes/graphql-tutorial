import mongoose from '../db/connectors';

const addrSchema = mongoose.Schema(
  {
    atype: {
      type: String,
      enum: ['MAIN', 'SUBS'],
      default: 'MAIN',
      required: true
    },
    streetName: {
      type: String,
      required: false
    },
    streetNumber: {
      type: String,
      required: false
    },
    floor: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    postCode: {
      type: String,
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

const Address = mongoose.model('Address', addrSchema, 'address');

export default Address;
