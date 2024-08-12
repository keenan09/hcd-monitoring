const express = require('express');
const router = express.Router();
const { getJobNames } = require('../controllers/controllerGetJobNames');

router.get('/names', getJobNames)

module.exports = router