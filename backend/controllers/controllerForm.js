const FormSubmission = require('../models/modelForm');

exports.submitForm = async (req, res) => {
    try {
        const newSubmission = new FormSubmission(req.body)
        await newSubmission.save();
        res.status(201).json({ message: "Form submitted successfully!" })
    } catch (error) {
        res.status(500).json({ error: "An error occurred while submitting the form." })
    }
};