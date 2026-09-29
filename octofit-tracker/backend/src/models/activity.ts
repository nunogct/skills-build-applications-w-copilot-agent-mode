import { model, Schema } from 'mongoose'

const activitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  activityType: {
    type: String,
    enum: ['running', 'walking', 'strength-training', 'cycling', 'swimming', 'yoga'],
    required: true,
  },
  durationMinutes: { type: Number, required: true, min: 1 },
  distanceKm: { type: Number, min: 0, default: 0 },
  points: { type: Number, min: 0, default: 0 },
  recordedAt: { type: Date, default: Date.now },
}, { timestamps: true })

export default model('Activity', activitySchema)