const express = require('express');
const router = express.Router();
const { getAllJob } = require('../controllers/controllerGetAllJob')

router.get('/', getAllJob)

module.exports = router