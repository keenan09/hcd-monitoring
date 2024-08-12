const mongoose = require('mongoose');

const Schema = mongoose.Schema

const FormSubmissionSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    major: { type: String, required: true },
    compatibility: { type: Number, required: true }, // need for the scoring
    gpa: { type: Number, required: true }, // need for the scoring
    positionExperience: { type: String, required: true }, // need for the scoring
    industryExperience: { type: String, required: true }, // need for the scoring
    salary: { type: Number, required: true }, // need for the scoring
    relocation: { type: String, required: true }, // need for the scoring
    languages: { type: [String], required: true }, // need for the scoring
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    jobName: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
    cv: { type: String, required: true }
});

const Applicant = mongoose.model('Applicant', FormSubmissionSchema)

module.exports = Applicant