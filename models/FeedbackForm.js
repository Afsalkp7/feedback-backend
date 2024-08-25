import mongoose from 'mongoose';
const { Schema } = mongoose;

const FeedbackFormSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'FeedbackField'
    }]
}, { timestamps: true });

const FeedbackForm = mongoose.model('FeedbackForm', FeedbackFormSchema);
export default FeedbackForm;
