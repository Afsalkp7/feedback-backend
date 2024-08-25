import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    feedbackForm: {
        type: Schema.Types.ObjectId,
        ref: 'FeedbackForm',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Ensure that a User model exists if using this reference
        required: true
    },
    responses: [{
        field: {
            type: Schema.Types.ObjectId,
            ref: 'FeedbackField'
        },
        value: Schema.Types.Mixed 
    }]
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
