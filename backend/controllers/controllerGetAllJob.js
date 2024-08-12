const Job = require('../models/modelAddJob');


exports.getAllJob = async (req, res) => {
    try {
        const jobs = await Job.find() // Fetch all jobs from MongoDB
        res.json(jobs)
    } catch (err) {
        res.status(500).json('Error: ' + err)
    }
}