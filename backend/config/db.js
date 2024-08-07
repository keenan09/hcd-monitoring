const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // uri
    const uri = "mongodb+srv://keenanhashim:Keen09R17@hcdapplicant.iix5jli.mongodb.net/R17Applicant?retryWrites=true&w=majority&appName=HCDApplicant"
    //connect
    await mongoose.connect(uri)

    console.log('MongoDB connected')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB;