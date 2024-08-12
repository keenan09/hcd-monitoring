const Job = require('../models/modelAddJob');

exports.getJobNames = async (req, res) => {
    try {
        const jobNames = await Job.find({}, 'jobname'); // Fetch only jobname field
        res.json(jobNames);
    } catch (err) {
        res.status(500).json('Error: ' + err);
    }
}