import { model, Schema } from 'mongoose'

const workoutSchema = new Schema({
  title: { type: String, required: true, unique: true, trim: true },
  activityType: { type: String, required: true, trim: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  description: { type: String, required: true, trim: true },
}, { timestamps: true })

export default model('Workout', workoutSchema)