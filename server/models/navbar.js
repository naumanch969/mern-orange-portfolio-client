import mongoose from 'mongoose'

const NavbarSchema = mongoose.Schema({

    logo: {
        type: {
            logoText: String,
            logoImage: { file: Object, url: String }
        },
    },
    navLinks: {
        type: [{ name: String, link: String }]               // i.e., {name:About, link: #about }
    },
    socialMedia: {
        type: [{ name: String, link: String }]               // i.e., {name:facebook, link: link-of-my-facebook-account}
    }

})

const NavbarModel = new mongoose.model('Navbar', NavbarSchema)
export default NavbarModel