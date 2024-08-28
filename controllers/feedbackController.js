
import mongoose from 'mongoose';
import FeedbackField from '../models/FeedbackField.js';
import FeedbackForm from '../models/FeedbackForm.js';
import Review from '../models/Review.js';
import User from '../models/User.js';

// Controller function to handle adding a feedback form
export const addFeedbackForm = async (req, res) => {
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


// export const userReviewedFeedbacks = async (req, res) => {
//     try {
        
//         const userId = req.user;

//         // Fetch the user from the database
//         const user = await User.findById(userId).select('feedbacks');
        
        

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Extract the feedback IDs
//         const feedbackIds = user.feedbacks;

//         if (feedbackIds.length === 0) {
//             return res.status(200).json({ feedbacks: [] }); // No feedbacks found for the user
//         }
//         console.log(feedbackIds);
//         // Fetch all feedbacks that match the user.feedbacks IDs
//         const feedbacks = await FeedbackForm.find({ _id: { $in: feedbackIds } });
        
        
//         // Respond with the feedback IDs
//         res.status(200).json({ feedbacks });
//     } catch (error) {
//         console.error("Error fetching user reviewed feedbacks:", error.message);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
// Adjust the import according to your file structure

 // Adjust the import according to your file structure

// Adjust the import according to your file structure
 
// Adjust the import according to your file structure

 // Ensure mongoose is imported correctly
 // Adjust the import according to your file structure
// Adjust the import according to your file structure

export const userReviewedFeedbacks = async (req, res) => {
    try {
        const userId = req.user;

        // Fetch the user from the database
        const user = await User.findById(userId).select('feedbacks');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract feedback IDs
        const feedbackIds = user.feedbacks;

        // Check if feedback IDs are empty
        if (!feedbackIds || feedbackIds.length === 0) {
            return res.status(200).json({ feedbackIds: [] }); // No feedbacks found for the user
        }

        // Log the feedback IDs for debugging
        console.log("Feedback IDs:", feedbackIds);

        // Convert feedback IDs to ObjectId
        const objectIdFeedbackIds = feedbackIds.map(id => new mongoose.Types.ObjectId(id));
        console.log("Converted Feedback IDs:", objectIdFeedbackIds);

        // Fetch all reviews that match the user.feedbacks IDs
        const reviews = await Review.find({ _id: { $in: objectIdFeedbackIds } });

        // Log the fetched reviews for debugging
        console.log("Fetched Reviews:", reviews);

        // Extract feedbackForm IDs from reviews
        const feedbackFormIds = reviews.map(review => review.feedbackForm);
        console.log("Feedback Form IDs:", feedbackFormIds);

        // Respond with the feedbackForm IDs
        res.status(200).json({ feedbackIds: feedbackFormIds });
    } catch (error) {
        console.error("Error fetching user reviewed feedbacks:", error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};