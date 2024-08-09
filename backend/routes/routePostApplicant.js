const express = require('express')
const router = express.Router()
const { submitFormApplicant } = require('../controllers/controllerApplicant')
const upload = require('../controllers/controllerUpload')

router.post('/submit', upload.single('cv'), submitFormApplicant)

module.exports = router