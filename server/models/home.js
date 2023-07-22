import mongoose from 'mongoose'

const HomeSchema = mongoose.Schema({

    helloText: {
        type: String,
    },
    images: {
        type: [{ file: Object, url: String }],
    },
    heading1: {
        type: String,
    },
    subHeading1: {
        type: String,
    },
    heading2: {
        type: String,
    },
    buttons: {
        type: [{ text: String, variant: String }],
    },

})

const HomeModel = new mongoose.model('Home', HomeSchema)
export default HomeModel