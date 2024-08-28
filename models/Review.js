import mongoose from 'mongoose';

const { Schema } = mongoose;

const ResponseSchema = new Schema({
    fieldId: {
        type: Schema.Types.ObjectId,  // Assuming fieldId is an ObjectId, adjust type if necessary
        required: true
    },
    response: {
        type: String,  // Adjust type according to your data (e.g., String, Number, etc.)
        required: true
    }
}, { _id: false }); // _id: false to avoid creating an additional `_id` for each response object

const ReviewSchema = new Schema({
    feedbackForm: {
        type: Schema.Types.ObjectId,  // Assuming feedbackFormId is an ObjectId
        ref: 'FeedbackForm',  // Reference to the FeedbackForm model if applicable
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,  // Assuming userId is an ObjectId
        ref: 'User',  // Reference to the User model if applicable
        required: true
    },
    responses: [ResponseSchema],  // Array of response objects
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
