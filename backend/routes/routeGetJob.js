const express = require('express');
const Job = require('../models/modelAddJob');

const router = express.Router();

// Route to get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find() // Fetch all jobs from MongoDB
        res.json(jobs)
    } catch (err) {
        res.status(400).json('Error: ' + err)
    }
});

module.exports = router;