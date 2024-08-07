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
const routeAddJob = require('./routes/routeAddJob')
app.use('/jobs', routeAddJob)

const routeGetJob = require('./routes/routeGetJob')
app.use('/jobs', routeGetJob)

// Start the server
const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});