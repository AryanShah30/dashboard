import mongoose, { Document, Schema } from 'mongoose';

interface IWarden extends Document {
  name: string;
  employeeId: string;
  email: string;
  password: string;
}

const wardenSchema: Schema = new Schema({
  name: { type: String, required: true },
  employeeId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.Warden || mongoose.model<IWarden>('Warden', wardenSchema);
