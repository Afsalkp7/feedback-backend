import mongoose from 'mongoose';
const { Schema } = mongoose;

const FeedbackFieldSchema = new Schema({
    fieldType: {
        type: String,
        enum: ['StarRating', 'SmileRating', 'TextArea', 'RadioButtons', 'Categories', 'NumericalRating', 'SingleLineInput'],
        required: true
    },
    label: {
        type: String,
        required: true
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    errorMessage: {
        type: String,
        default: ''
    },
    options: {
        type: [String],
        default: []
    } // For RadioButtons, Categories, etc.
});

const FeedbackField = mongoose.model('FeedbackField', FeedbackFieldSchema);
