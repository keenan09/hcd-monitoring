const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require("./config/db")

const app = express()
connectDB();

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Routes
const routePostJob = require('./routes/routePostJob')
app.use('/jobs', routePostJob)

const routeAllGetJob = require('./routes/routeGetAllJob')
app.use('/jobs', routeAllGetJob)

const routeGetJobNames = require('./routes/routeGetJobNames');
app.use('/jobs', routeGetJobNames);

const routePostForm = require('./routes/routePostForm')
app.use('/applicants', routePostForm)

const routeGetApplicants = require('./routes/routeGetApplicant')
app.use('/applicants', routeGetApplicants)

// Start the server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});