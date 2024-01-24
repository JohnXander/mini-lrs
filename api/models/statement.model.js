import mongoose from 'mongoose';

const statementSchema = new mongoose.Schema({
  actor: {
    type: Object,
    required: true,
  },
  verb: {
    type: Object,
    required: true,
  },
  object: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

const Statement = mongoose.model('Statement', statementSchema);

export default Statement;
