const FormSubmission = require('../models/modelForm');

exports.submitForm = async (req, res) => {
    try {
        const formData = req.body
        
        formData.submittedAt = new Date()
        const newForm = new FormSubmission(formData)

        await newForm.save()
        res.status(201).json({ message: "Form submitted successfully!" })
    } catch (error) {
        res.status(500).json({ error: "An error occurred while submitting the form." })
    }
};