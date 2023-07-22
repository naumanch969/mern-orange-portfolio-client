import mongoose from 'mongoose'

const FooterSchema = mongoose.Schema({

    about: {
        type: {
            title: String,
            detail: String
        },
    },
    links: {
        type: {
            title: String,
            links: [{ name: String, link: String }]
        },
    },
    services: {
        type: {
            title: String,
            services: [{ name: String, link: String }]
        },
    },
    contacts: {
        type: {
            title: String,
            contacts: [{ icon: String, text: String }]
        },
    },
    copyrightText: {
        type: String,
    }
})

const FooterModel = new mongoose.model('Footer', FooterSchema)
export default FooterModel