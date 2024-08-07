
const job = require("../models/modelAddJob")

exports.createJob = async (req, res) => {
    const newJob = new job(req.body)

    try {
        await newJob.save()
        res.status(201).json(newJob)
    } catch (err) {
        res.status(400).json({ error: 'Error saving the job', details: err.message })
    }
}
