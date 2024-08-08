const mongoose = require('mongoose');

const Schema = mongoose.Schema

const FormSubmissionSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    major: { type: String, required: true },
    compatibility: { type: Number, required: true },
    gpa: { type: Number, required: true },
    positionExperience: { type: String, required: true },
    industryExperience: { type: String, required: true },
    salary: { type: Number, required: true },
    relocation: { type: String, required: true },
    languages: { type: [String], required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    jobName: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now } 
});

const Form = mongoose.model('Form', FormSubmissionSchema)

module.exports = Form