import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  taskName: string;
  taskDescription: string;
  preferredTime: Date;
  studentId: string;
  studentName: string;
  studentRoom: string;
  wardenAssigned: boolean;
  status: 'Pending' | 'Assigned' | 'Completed';
  assignedTo?: string;
  feedback?: {
    stars: number;
    message: string;
  };
}

const taskSchema: Schema = new Schema({
  taskName: { type: String, required: true },
  taskDescription: { type: String, required: true },
  preferredTime: { type: Date, required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String, required: true },
  studentRoom: { type: String, required: true },
  wardenAssigned: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending', 'Assigned', 'Completed'], default: 'Pending' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'Worker' },
  feedback: {
    stars: { type: Number },
    message: { type: String },
  },
});

export default mongoose.models.Task || mongoose.model<ITask>('Task', taskSchema);
