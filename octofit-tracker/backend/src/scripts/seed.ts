import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const users = await Promise.all([
      User.findOneAndUpdate(
        { username: 'alex_runner' },
        { username: 'alex_runner', email: 'alex@example.com', age: 15, fitnessLevel: 'intermediate' },
        { upsert: true, new: true, runValidators: true },
      ),
      User.findOneAndUpdate(
        { username: 'sam_stride' },
        { username: 'sam_stride', email: 'sam@example.com', age: 14, fitnessLevel: 'beginner' },
        { upsert: true, new: true, runValidators: true },
      ),
      User.findOneAndUpdate(
        { username: 'jordan_moves' },
        { username: 'jordan_moves', email: 'jordan@example.com', age: 16, fitnessLevel: 'advanced' },
        { upsert: true, new: true, runValidators: true },
      ),
    ]);

    const teams = await Promise.all([
      Team.findOneAndUpdate(
        { name: 'Comet Crew' },
        { name: 'Comet Crew', members: [users[0]._id, users[1]._id], points: 275 },
        { upsert: true, new: true, runValidators: true },
      ),
      Team.findOneAndUpdate(
        { name: 'Orbit Runners' },
        { name: 'Orbit Runners', members: [users[2]._id], points: 190 },
        { upsert: true, new: true, runValidators: true },
      ),
    ]);

    const recordedAt = new Date('2026-09-28T16:00:00.000Z');
    await Promise.all([
      Activity.findOneAndUpdate(
        { user: users[0]._id, activityType: 'running', recordedAt },
        { user: users[0]._id, activityType: 'running', durationMinutes: 32, distanceKm: 4.2, points: 85, recordedAt },
        { upsert: true, new: true, runValidators: true },
      ),
      Activity.findOneAndUpdate(
        { user: users[1]._id, activityType: 'walking', recordedAt },
        { user: users[1]._id, activityType: 'walking', durationMinutes: 40, distanceKm: 3.1, points: 55, recordedAt },
        { upsert: true, new: true, runValidators: true },
      ),
      Activity.findOneAndUpdate(
        { user: users[2]._id, activityType: 'strength-training', recordedAt },
        { user: users[2]._id, activityType: 'strength-training', durationMinutes: 35, points: 75, recordedAt },
        { upsert: true, new: true, runValidators: true },
      ),
    ]);

    await Promise.all(users.map((user, index) => LeaderboardEntry.findOneAndUpdate(
      { user: user._id },
      { user: user._id, team: index < 2 ? teams[0]._id : teams[1]._id, points: [160, 115, 190][index] },
      { upsert: true, new: true, runValidators: true },
    )));

    await Promise.all([
      {
        title: 'Steady Start Run',
        activityType: 'running',
        difficulty: 'beginner',
        durationMinutes: 20,
        description: 'An easy-paced run with a short warm-up and cool-down.',
      },
      {
        title: 'Strength Foundations',
        activityType: 'strength-training',
        difficulty: 'intermediate',
        durationMinutes: 30,
        description: 'A balanced bodyweight circuit with controlled rest periods.',
      },
      {
        title: 'Interval Builder',
        activityType: 'running',
        difficulty: 'advanced',
        durationMinutes: 35,
        description: 'Alternating brisk intervals and recovery jogs.',
      },
    ].map((workout) => Workout.findOneAndUpdate(
      { title: workout.title },
      workout,
      { upsert: true, new: true, runValidators: true },
    )));

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
