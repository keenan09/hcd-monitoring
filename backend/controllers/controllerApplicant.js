const Applicant = require('../models/modelForm'); //model path

exports.getApplicants = async (req, res) => {
    try {
        const { jobName, startDate, endDate } = req.query;

        const filters = {}
        if (jobName) {
            filters.jobName = jobName
        }
        if (startDate || endDate) {
            filters.submittedAt = {}
            if (startDate) filters.submittedAt.$gte = new Date(startDate)
            if (endDate) filters.submittedAt.$lte = new Date(endDate)
        }

        const applicants = await Applicant.find(filters)
        res.status(200).json(applicants)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
