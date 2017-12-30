import mongoose from '../db/connectors';

const catSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true }
});

const catModel = mongoose.model('cat', catSchema);

export default catModel;
