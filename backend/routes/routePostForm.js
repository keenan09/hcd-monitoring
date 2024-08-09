const express = require('express')
const router = express.Router()
const { submitForm } = require('../controllers/controllerForm')
const upload = require('../controllers/controllerUpload')

router.post('/submit', upload.single('cv'), submitForm)

module.exports = router