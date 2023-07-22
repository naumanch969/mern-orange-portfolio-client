import Navbar from "../models/navbar.js";


export const getNavbarContent = async (req, res) => {
    try {
        console.log(`workin`)
        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        console.log('navbarObj', navbarObj)
        if (!navbarObj) return res.status(200).json({ result: { navbarDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: navbarObj, message: 'navbar content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getNavbarContent - navbar.js - controllers', error })
    }
}
export const createNavbarContent = async (req, res) => {
    try {
        const { logo, navLinks, socialMedia } = [{}, [], []];

        const navbarArr = await Navbar.find()

        if (navbarArr.length > 0) return res.status(400).json({ message: 'there should only be one navbar document. So this post action can not be proceed.' })
        const result = await Navbar.create({ logo, navLinks, socialMedia })
        res.status(200).json({ result, message: 'navbar content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createNavbarContent - controllers', error })
    }
}



export const updateLogo = async (req, res) => {
    try {
        const { logoText, logoImage } = req.body;
        if (typeof (logoText) == 'undefined' || typeof (logoImage) == 'undefined') return res.status(400).json({ message: `logoText and logoImage = {file , url} fields sould be provided` })

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id
        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })

        navbarObj.logo.logoText = logoText
        navbarObj.logo.logoImage.file = logoImage.file
        navbarObj.logo.logoImage.url = logoImage.url
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: navbarObj.logo, message: 'logo of Navbar content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateLogo - controllers', error })
    }
}



export const addNavLink = async (req, res) => {
    try {
        const { name, link } = req.body;
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id
        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })

        navbarObj.navLinks = navbarObj.navLinks.concat({ name, link })
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })

        res.status(200).json({ result: navbarObj.navLinks, message: 'navLinks of Navbar added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addNavLink - controllers', error })
    }
}
export const updateNavLink = async (req, res) => {
    try {
        const { navLinkId } = req.params;
        const { name, link } = req.body;
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id
        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })

        const findedNavLink = navbarObj.navLinks.find((navLink) => navLink._id == navLinkId)
        if (!findedNavLink) return res.status(400).json({ message: `no navLink exist with id ${navLinkId}` })

        findedNavLink.name = name
        findedNavLink.link = link
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: findedNavLink, message: `navLink updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in udpateNavLink - controllers', error })
    }
}
export const updateNavLinkName = async (req, res) => {
    try {
        const { navLinkId } = req.params;
        const { name } = req.body;
        if (typeof (name) == 'undefined') return res.status(400).json({ message: `name  fields sould be provided` })

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id
        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })

        const findedNavLink = navbarObj.navLinks.find((navLink) => navLink._id == navLinkId)
        if (!findedNavLink) return res.status(400).json({ message: `no navLink exist with id ${navLinkId}` })

        findedNavLink.name = name
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: findedNavLink, message: `navLink updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in udpateNavLink - controllers', error })
    }
}
export const updateNavLinkLink = async (req, res) => {
    try {
        const { navLinkId } = req.params;
        const { link } = req.body;
        if (typeof (link) == 'undefined') return res.status(400).json({ message: `link fields sould be provided` })

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id
        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })

        const findedNavLink = navbarObj.navLinks.find((navLink) => navLink._id == navLinkId)
        if (!findedNavLink) return res.status(400).json({ message: `no navLink exist with id ${navLinkId}` })

        findedNavLink.link = link
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: findedNavLink, message: `navLink updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in udpateNavLink - controllers', error })
    }
}
export const deleteNavLink = async (req, res) => {
    try {
        const { navLinkId } = req.params;

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id

        const findedNavLink = navbarObj.navLinks.find((navLink) => navLink._id == navLinkId)

        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })
        if (!findedNavLink) return res.status(400).json({ message: `no navLink exist with id ${navLinkId}` })

        navbarObj.navLinks = navbarObj.navLinks.filter(navLink => navLink._id != navLinkId)
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: navLinkId, message: `navLink deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteNavLink - controllers', error })
    }
}



export const addSocialMedia = async (req, res) => {
    try {
        const { name, link } = req.body;

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id

        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })
        navbarObj.socialMedia = navbarObj.socialMedia.concat({ name, link })
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: navbarObj.socialMedia, message: 'socialMedia item added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addSocialMedia - controllers', error })
    }
}
export const updateSocialMedia = async (req, res) => {
    try {

        const { socialId } = req.params;
        const { name, link } = req.body;

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id

        const findedSocialMedia = navbarObj.socialMedia.find((social) => social._id == socialId)

        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })
        if (!findedSocialMedia) return res.status(400).json({ message: `no socialMedia item exist with id ${socialId}` })
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })

        findedSocialMedia.name = name
        findedSocialMedia.link = link
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: findedSocialMedia, message: `socialMedia udpated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateSocialMedia - controllers', error })
    }
}
export const deleteSocialMedia = async (req, res) => {
    try {
        const { socialId } = req.params;

        const navbarArr = await Navbar.find()
        const navbarObj = navbarArr[0]
        const navbarObjId = navbarObj._id

        const findedSocialMedia = navbarObj.socialMedia.find((social) => social._id == socialId)

        if (!navbarObj) return res.status(400).json({ message: 'navbar document has not been created yet' })
        if (!findedSocialMedia) return res.status(400).json({ message: `no socialMedia item exist with id ${socialId}` })

        navbarObj.socialMedia = navbarObj.socialMedia.filter(social => social._id != socialId)
        await Navbar.findByIdAndUpdate(navbarObjId, navbarObj, { new: true })
        res.status(200).json({ result: socialId, message: `socialMedia item deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteSocialMedia - controllers', error })
    }
}




export const deleteNavbarCollection = async (req, res) => {
    try {
        const result = await Navbar.deleteMany()
        res.status(200).json({ result: { ...result, navbarDocumentNotExist: true }, message: `Navbar collection deleted successfully` })
    } catch (error) {
        res.status(500).json({ error, message: "error in deleteNavbarCollection - controllers" })
    }
}