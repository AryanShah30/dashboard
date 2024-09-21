import mongoose, { Document, Schema } from 'mongoose';

interface IStudent extends Document {
  name: string;
  regno: string;
  email: string;
  password: string;
  room: string;
  pendingTasks: string[];
  assignedTasks: string[];
}

const studentSchema: Schema = new Schema({
  name: { type: String, required: true },
  regno: { type: String, match: /^\d{2}[A-Z]{3}\d{4}$/, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  room: { type: String },
  pendingTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  assignedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export default mongoose.models.Student || mongoose.model<IStudent>('Student', studentSchema);
