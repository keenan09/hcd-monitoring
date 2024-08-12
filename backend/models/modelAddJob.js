const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    jobname: { type: String, required: true },
    jobAimed: { type:String, required: true},
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    jobDescription: { type: String, required: true },
    minPositionExperience: { type: Number, required: true }, //criteria
    maxPositionExperience: { type: Number, required: true }, //criteria
    minIndustryExperience: { type: Number, required: true }, //criteria
    maxIndustryExperience: { type: Number, required: true }, //criteria
    minSalary: { type: Number, required: true }, //criteria
    maxSalary: { type: Number, required: true }, //criteria
    languages: { type: [String], required: true }, //criteria
}, {
    timestamps: true,
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job