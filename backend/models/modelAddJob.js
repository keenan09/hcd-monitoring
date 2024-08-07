const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    jobname: { type: String, required: true },
    jobAimed: { type:String, required: true},
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    jobDescription: { type: String, required: true },
    minPositionExperience: { type: Number, required: true },
    maxPositionExperience: { type: Number, required: true },
    minIndustryExperience: { type: Number, required: true },
    maxIndustryExperience: { type: Number, required: true },
    minSalary: { type: Number, required: true },
    maxSalary: { type: Number, required: true },
    languages: { type: [String], required: true },
}, {
    timestamps: true,
})

const Job = mongoose.model('Job', jobSchema)

module.exports = Job