
const { createJob } =  require("../controllers/controllerAddJob.js")

const router = require('express').Router()

router.route('/add').post(createJob)

module.exports = router;
