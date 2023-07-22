import mongoose from 'mongoose'

const FreelancingSchema = mongoose.Schema({

    heading: {
        type: String,
    },
    detail: {
        type: String,
    },
    featureCards: {
        type: [{
            title: String,          // i.e., awards
            quantity: String,       // i.e., 120
        }],
    },
    freelancingCards: {
        type: [{
            title: String,          // i.e., fiver
            cards: [{ title: String, link: String, description: String, category: String, images: { type: [{ file: Object, url: String }] } }],  // i.e., {title:I will crate ...., link:gigLink, description: tis gig is for someting purpose.., category: web development}
            detail: String,         // i.e., detail for fiver account
        }],
    },
    buttons: {
        type: [{ text: String, variant: String }],
    }
})

const FreelancingModel = new mongoose.model('Freelancing', FreelancingSchema)
export default FreelancingModel