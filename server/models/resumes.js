import mongoose from 'mongoose'

var now = new Date();
var year = now.getFullYear();
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var day = ("0" + now.getDate()).slice(-2);
var hour = ("0" + now.getHours()).slice(-2);
var minute = ("0" + now.getMinutes()).slice(-2);
var second = ("0" + now.getSeconds()).slice(-2);
var formattedDateTime = day + "-" + month + "-" + year + ", " + hour + ":" + minute + ":" + second;

const ResumeSchema = mongoose.Schema({

    forwardHeading: {
        type: String,
    },
    backHeading: {
        type: String,
    },
    detail: {
        type: String,
    },
    resumes: {
        type: [{
            title: String,
            subTitle: String,
            detail: String,
            date: { type: String, default: formattedDateTime },
        }],
    },
    buttons: {
        type: [{ text: String, variant: String }],
    }
})

const ResumeModel = new mongoose.model('Resume', ResumeSchema)
export default ResumeModel