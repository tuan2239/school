import mongoose from 'mongoose';

export default mongoose.model('Children', { name: String, grade: Number });