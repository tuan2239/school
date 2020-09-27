import mongoose from 'mongoose';

export default mongoose.model('User', {
    name: String,
    email: String,
    passwordHash: String,
    phone: String
});