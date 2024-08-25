const ReviewSchema = new Schema({
    feedbackForm: {
        type: Schema.Types.ObjectId,
        ref: 'FeedbackForm',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
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
