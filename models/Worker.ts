import mongoose, { Document, Schema } from 'mongoose';

interface IWorker extends Document {
  name: string;
  workerId: string;
  email: string;
  password: string;
  assignedTasks: string[];
}

const workerSchema: Schema = new Schema({
  name: { type: String, required: true },
  workerId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  assignedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

export default mongoose.models.Worker || mongoose.model<IWorker>('Worker', workerSchema);
