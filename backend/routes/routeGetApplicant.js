const express = require('express');
const router = express.Router();
const { getApplicants } = require('../controllers/controllerApplicant');

router.get('/', getApplicants)

module.exports = router