const ApplicantFormSubmission = require('../models/modelApplicant')
const path = require('path')

exports.submitForm = async (req, res) => {
    try {
        const formData = req.body
        formData.submittedAt = new Date() 
        
        if (req.file) {
            formData.cv = req.file.filename
        }
        const newForm = new ApplicantFormSubmission(formData)

        await newForm.save()
        res.status(201).json({ message: "Form submitted successfully!" })
    } catch (error) {
        res.status(500).json({ error: "An error occurred while submitting the form." })
    }
};