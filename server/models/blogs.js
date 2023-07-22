import mongoose from 'mongoose'


var now = new Date();
var year = now.getFullYear();
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var day = ("0" + now.getDate()).slice(-2);
var hour = ("0" + now.getHours()).slice(-2);
var minute = ("0" + now.getMinutes()).slice(-2);
var second = ("0" + now.getSeconds()).slice(-2);
var formattedDateTime = day + "-" + month + "-" + year + ", " + hour + ":" + minute + ":" + second;


const BlogsSchema = mongoose.Schema({

    forwardHeading: { type: String, },
    backHeading: { type: String, },
    detail: { type: String, },
    blogs: {
        type: [{
            title: String,
            description: String,
            date: { type: String, default: formattedDateTime },
            name: String,
            images: [{ file: Object, url: String }]
        }],
    }

})

const BlogsModel = new mongoose.model('Blog', BlogsSchema)
export default BlogsModel