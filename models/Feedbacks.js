import mongoose from 'mongoose';
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    forms: [{
        type: Schema.Types.ObjectId,
        ref: 'FeedbackForm'
    }]
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;
