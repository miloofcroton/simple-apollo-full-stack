import mongoose from 'mongoose';

const thingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

const Thing = mongoose.model('Thing', thingSchema);

export default Thing;
