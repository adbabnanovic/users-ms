import { Schema, model, Document } from 'mongoose';

export interface iUser extends Document {
  name: string,
  email: string,
  create_date: Date,
  connections: Schema.Types.ObjectId[]
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  connections: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

export const User = model<iUser>('User', userSchema);
