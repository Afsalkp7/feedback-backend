// import FeedbackField from '../models/FeedbackField.js';
// import FeedbackForm from '../models/FeedbackForm.js';
// import Review from '../models/Review.js';
// import User from '../models/User.js'
// // Controller function to handle adding a feedback form
// export const addFeedbackForm = async (req, res) => {
//     console.log(req.body);
    
//     const { title, fields } = req.body;

//     try {
//         // Validate input
//         if (!title || !fields || fields.length < 1 || fields.length > 7) {
//             return res.status(400).json({ message: "Invalid input: Title is required, and fields must be between 1 and 7." });
//         }

//         // Create FeedbackFields and store their IDs
//         const fieldIds = await Promise.all(fields.map(async (field) => {
//             const feedbackField = new FeedbackField({
//                 fieldType: field.fieldType,
//                 label: field.label,
//                 isRequired: field.isRequired || false,
//                 errorMessage: field.errorMessage || '',
//                 options: field.options || []
//             });
//             await feedbackField.save();
//             return feedbackField._id;
//         }));

//         // Create FeedbackForm with the stored field IDs
//         const feedbackForm = new FeedbackForm({
//             title,
//             fields: fieldIds,
//         });

//         // Save the feedback form to the database
//         await feedbackForm.save();

//         // Respond with the created feedback form
//         res.status(201).json(feedbackForm);
//     } catch (error) {
//         console.error("Error creating feedback form:", error.message);
//         res.status(500).json({ message: "Error creating feedback form", error: error.message });
//     }
// };


// export const addReview = async (req, res) => {
//     const { feedbackFormId, responses } = req.body;
//     const userId = req.user
//     try {
//         // Validate input
//         if (!feedbackFormId || !userId || !responses || responses.length === 0) {
//             return res.status(400).json({ message: "Invalid input: Feedback form ID, user ID, and responses are required." });
//         }

//         // Create a new review
//         const review = new Review({
//             feedbackForm: feedbackFormId,
//             user: userId,
//             responses
//         });

//         // Save the review to the database
//         const savedReview = await review.save();
//         await User.findByIdAndUpdate(userId, { $push: { feedbacks: savedReview._id } });
//         // Respond with the created review
//         res.status(201).json(savedReview);
//     } catch (error) {
//         console.error("Error adding review:", error.message);
//         res.status(500).json({ message: "Error adding review", error: error.message });
//     }
// };

// export const showFeeds = async (req, res) => {
//     try {
//         // Find all feedback forms
//         const feedbackForms = await FeedbackForm.find().populate('fields');

//         // Aggregate fields
//         const aggregatedFields = feedbackForms.map(form => ({
//             title: form.title,
//             fields: form.fields.map(field => ({
//                 fieldType: field.fieldType,
//                 label: field.label,
//                 isRequired: field.isRequired,
//                 errorMessage: field.errorMessage,
//                 options: field.options
//             }))
//         }));

//         // Respond with the aggregated fields
//         console.log(aggregatedFields);
        
//         // res.status(200).json(aggregatedFields);
//     } catch (error) {
//         console.error("Error fetching feedback forms:", error.message);
//         res.status(500).json({ message: "Error fetching feedback forms", error: error.message });
//     }
// };


import FeedbackField from '../models/FeedbackField.js';
import FeedbackForm from '../models/FeedbackForm.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

// Controller function to handle adding a feedback form
export const addFeedbackForm = async (req, res) => {
    console.log(req.body);
    
    const { title, fields } = req.body;

    try {
        // Validate input
        if (!title || !fields || fields.length < 1 || fields.length > 7) {
            return res.status(400).json({ message: "Invalid input: Title is required, and fields must be between 1 and 7." });
        }

        // Create FeedbackFields and store their IDs
        const fieldIds = await Promise.all(fields.map(async (field) => {
            const feedbackField = new FeedbackField({
                fieldType: field.fieldType,
                label: field.label,
                isRequired: field.isRequired || false,
                errorMessage: field.errorMessage || '',
                options: field.options || []
            });
            await feedbackField.save();
            return feedbackField._id;
        }));

        // Create FeedbackForm with the stored field IDs
        const feedbackForm = new FeedbackForm({
            title,
            fields: fieldIds,
        });

        // Save the feedback form to the database
        await feedbackForm.save();

        // Respond with the created feedback form
        res.status(201).json(feedbackForm);
    } catch (error) {
        console.error("Error creating feedback form:", error.message);
        res.status(500).json({ message: "Error creating feedback form", error: error.message });
    }
};

export const addReview = async (req, res) => {
    console.log(req.body);

    const { feedbackFormId, responses } = req.body;
    const userId = req.user;

    try {
        // Validate input
        if (!feedbackFormId || !userId || !responses || responses.length === 0) {
            return res.status(400).json({ message: "Invalid input: Feedback form ID, user ID, and responses are required." });
        }

        // Transform the responses to match the schema
        const formattedResponses = responses.map(response => {
            const fieldId = Object.keys(response)[0]; // Get the fieldId from the key
            const responseValue = response[fieldId]; // Get the response value
            return { fieldId, response: responseValue };
        });

        // Create a new review with the formatted responses
        const review = new Review({
            feedbackForm: feedbackFormId,
            user: userId,
            responses: formattedResponses,
        });

        console.log(review);  // Log the review object to verify the structure

        // Save the review to the database
        const savedReview = await review.save();
        await User.findByIdAndUpdate(userId, { $push: { feedbacks: savedReview._id } });

        // Respond with the created review
        res.status(201).json(savedReview);
    } catch (error) {
        console.error("Error adding review:", error.message);
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
};



export const showFeeds = async (req, res) => {
    try {
        // Find all feedback forms and populate their fields
        const feedbackForms = await FeedbackForm.find().populate('fields');
        
        
        // Aggregate fields
        const aggregatedFields = feedbackForms.map(form => ({
            feedbackFormId : form._id,
            title: form.title,
            fields: form.fields.map(field => (
                {
                field_id : field._id,
                fieldType: field.fieldType,
                label: field.label,
                isRequired: field.isRequired,
                errorMessage: field.errorMessage,
                options: field.options
            }))
        }));
        console.log(aggregatedFields);
        
        // Respond with the aggregated fields
        res.status(200).json(aggregatedFields);
    } catch (error) {
        console.error("Error fetching feedback forms:", error.message);
        res.status(500).json({ message: "Error fetching feedback forms", error: error.message });
    }
};
