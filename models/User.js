import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    isVerified: {
        type: Boolean, 
        default: false 
    },
    feedbacks: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'feedback' 
    }]
});

export default mongoose.model('User', UserSchema);