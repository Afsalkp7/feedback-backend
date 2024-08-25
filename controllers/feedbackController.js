import FeedbackField  from '../models/FeedbackField'; // Ensure models are imported correctly
import FeedbackForm from '../models/FeedbackForm'

const addFeedbackForm = async (title, fields) => {
    try {
        // Validate input
        if (!title || !fields || fields.length < 1 || fields.length > 7) {
            throw new Error("Invalid input: Title is required, and fields must be between 1 and 7.");
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

        console.log("Feedback form created successfully:", feedbackForm);
        return feedbackForm; // Return the created feedback form
    } catch (error) {
        console.error("Error creating feedback form:", error.message);
        throw error; // Rethrow the error for further handling if needed
    }
};
