const Applicant = require('../models/modelForm') // get applicant submission
const Job = require('../models/modelAddJob') // get job criteria

exports.getApplicants = async (req, res) => {
    try {
        const { jobName, startDate, endDate } = req.query;

        const filters = {};
        if (jobName) {
            filters.jobName = jobName;
        }
        if (startDate || endDate) {
            filters.submittedAt = {};
            if (startDate) filters.submittedAt.$gte = new Date(startDate);
            if (endDate) filters.submittedAt.$lte = new Date(endDate);
        }

        // Scoring system
        const applicants = await Applicant.find(filters).populate('jobId')
        const applicantsWithScores = await Promise.all(applicants.map(async applicant => {
            const job = applicant.jobId
            let score = 0

            // Position scoring max score = 20
            const [minPositionExperience, maxPositionExperience] = applicant.positionExperience.split("-").map(Number)
            const positionExperience = parseInt(maxPositionExperience)
            if (positionExperience > job.minPositionExperience && positionExperience <= job.maxPositionExperience) {
                score += 20
            }

            // Industry scoring max score = 20
            const [minIndustryExperience, maxIndustryExperience] = applicant.industryExperience.split("-").map(Number)
            const industryExperience = parseInt(maxIndustryExperience)
            if (industryExperience >= job.minIndustryExperience && industryExperience <= job.maxIndustryExperience) {
                score += 20;
            }

            // Salary scoring max score = 20
            if (applicant.salary < job.minSalary) {
                score += 20
            } else if (applicant.salary > job.maxSalary) {
                score -= 10
            } else {
                score += 15
            }

            // Relocation scoring max score = 10
            if (applicant.relocation === "yes") {
                score += 10
            } 

            // Language scoring max score = 15
            const matchLanguages = applicant.languages.filter(language => job.languages.includes(language)).length
            const languageScore = (matchLanguages / job.languages.length) * 15
            score += languageScore

            // Compatibility scoring max score = 20
            const compatibilityScore = (applicant.compatibility / 10) * 15
            score += compatibilityScore;

            // Status
            const status = score > 60 ? 'Accepted' : 'Rejected'

            return {
                ...applicant.toObject(),
                score: score.toFixed(2),
                status 
            };
        }));

        res.status(200).json(applicantsWithScores)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
