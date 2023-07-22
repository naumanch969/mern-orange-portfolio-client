import Footer from "../models/footer.js";

export const getFooterContent = async (req, res) => {
    try {
        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        if (!footerObj) return res.status(200).json({ result: { footerDocumentNotExist: true }, message: 'first document has not been created yet.' })

        res.status(200).json({ result: footerObj, message: 'footer content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getFooterContent - footer.js - controllers', error })
    }
}
export const createFooterContent = async (req, res) => {
    try {
        const [about, links, services, contacts, copyrightText] = [{ title: ``, detail: `` }, { title: ``, links: [{ name: ``, link: `` }] }, { title: ``, services: [{ name: ``, link: `` }] }, { title: ``, contacts: [{ icon: ``, text: `` }] }, ''];

        const footerArr = await Footer.find()
        if (footerArr.length > 0) return res.status(400).json({ message: 'there should only be one Footer document. So this post action can not be proceed.' })                   // if footer document is already created

        const result = await Footer.create({ about, links, services, contacts, copyrightText })
        res.status(200).json({ result, message: 'footer content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createFooterContent - footer.js - controllers', error })
    }
}



export const updateAboutTitle = async (req, res) => {
    try {
        const { title } = req.body;
        if (typeof (title) == 'undefined') return res.status(400).json({ message: `title and fields should be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.about.title = title
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.about.title, message: 'updateAboutTitle of footer content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateAboutTitle - footer.js - controllers', error })
    }
}
export const updateAboutDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (typeof (detail) == 'undefined') return res.status(400).json({ message: `title and detail fields should be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.about.detail = detail
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.about.detail, message: 'updateAboutDetail of footer content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateAbout - footer.js - controllers', error })
    }
}



export const updateLinksTitle = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: `title field sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.links.title = title
        await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.links.title, message: 'footer links title updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateLinksTitle - footer.js - controllers', error })
    }
}
export const addLinksLink = async (req, res) => {
    try {
        const { name, link } = req.body;
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.links.links = footerObj.links.links.concat({ name, link })
        await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.links.links, message: 'footer links link added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addLinksLink - footer.js - controllers', error })
    }
}
export const updateLinksLink = async (req, res) => {
    try {
        const { linkId } = req.params
        const { name, link } = req.body;
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj?._id
        if (!footerObj) return res.status(400).json({ message: 'Footer document has not been created yet' })

        const findedLink = footerObj.links.links.find((link) => link._id == linkId)
        if (!findedLink) return res.status(400).json({ message: `no footer links link exist with id ${linkId} ` })

        findedLink.name = name
        findedLink.link = link
        await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: findedLink, message: `footer link of id ${linkId} updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateLinksLink - footer.js - controllers', error })
    }
}
export const deleteLinksLink = async (req, res) => {
    try {
        const { linkId } = req.params

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj?._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        const findedLink = footerObj.links.links.find((link) => link._id == linkId)
        if (!findedLink) return res.status(400).json({ message: `no footer links link exist with id ${linkId} ` })

        footerObj.links.links = footerObj.links.links.filter(card => card._id != linkId)
        await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.links.links, message: `footer link of id ${linkId} deleted updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteLinksLink - footer.js - controllers', error })
    }
}




export const updateServicesTitle = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) return res.status(400).json({ message: `title field sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.services.title = title
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.services.title, message: 'footer services title updated successfully' })
    } catch (error) {
        res.status(404).json({ message: 'error in updateServicesTitle - footer.js - controllers', error })
    }
}
export const addServicesLink = async (req, res) => {
    try {
        const { name, link } = req.body;
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.services.services = footerObj.services.services.concat({ name, link })
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.services.services, message: 'footer serbvices link added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addServicesLink - footer.js - controllers', error })
    }
}
export const updateServicesLink = async (req, res) => {
    try {
        const { serviceId } = req.params
        const { name, link } = req.body;
        if (typeof (name) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `name and link fields sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj?._id
        if (!footerObj) return res.status(400).json({ message: 'Footer document has not been created yet' })

        const findedService = footerObj.services.services.find((service) => service._id == serviceId)
        if (!findedService) return res.status(400).json({ message: `no footer service exist with id ${serviceId} ` })

        findedService.name = name
        findedService.link = link
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: findedService, message: `footer link of id ${serviceId} updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateServicesLink - footer.js - controllers', error })
    }
}
export const deleteServicesLink = async (req, res) => {
    try {
        const { serviceId } = req.params

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj?._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        const findedLink = footerObj.services.services.find((service) => service._id == serviceId)
        if (!findedLink) return res.status(400).json({ message: `no link exist with id ${serviceId} ` })

        footerObj.services.services = footerObj.services.services.filter(service => service._id != serviceId)
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.services.services, message: `footer link of id ${serviceId} deleted updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteServicesLink - footer.js - controllers', error })
    }
}




export const updateContactTitle = async (req, res) => {
    try {
        const { title } = req.body;
        if (typeof (title) == 'undefined') return res.status(400).json({ message: `title field sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.contacts.title = title
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.contacts.title, message: 'footer contacts title updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateContactTitle - footer.js - controllers', error })
    }
}
export const addContact = async (req, res) => {
    try {
        const { icon, text } = req.body;
        if (typeof (icon) == 'undefined' || typeof (text) == 'undefined') return res.status(400).json({ message: `icon and text fields sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.contacts.contacts = footerObj.contacts.contacts.concat({ icon, text })
        const result = await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.contacts.contacts, message: 'footer contact added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addContact - footer.js - controllers', error })
    }
}
export const updateContact = async (req, res) => {
    try {
        const { contactId } = req.params
        const { icon, text } = req.body;
        if (typeof (icon) == 'undefined' || typeof (text) == 'undefined') return res.status(400).json({ message: `icon and text fields sould be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj?._id
        if (!footerObj) return res.status(400).json({ message: 'Footer document has not been created yet' })

        const findedContact = footerObj.contacts.contacts.find((contact) => contact._id == contactId)
        if (!findedContact) return res.status(400).json({ message: `no footer service exist with id ${contactId} ` })

        findedContact.icon = icon
        findedContact.text = text
        await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: findedContact, message: `footer contact of id ${contactId} updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateContact - footer.js - controllers', error })
    }
}
export const deleteContact = async (req, res) => {
    try {

        const { contactId } = req.params

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj?._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        const findedLink = footerObj.contacts.contacts.find((contact) => contact._id == contactId)
        if (!findedLink) return res.status(400).json({ message: `no link exist with id ${contactId} ` })

        footerObj.contacts.contacts = footerObj.contacts.contacts.filter(contact => contact._id != contactId)
        await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.contacts.contacts, message: `footer contact of id ${contactId} deleted updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteContact - footer.js - controllers', error })
    }
}



export const updateCopyright = async (req, res) => {
    try {
        const { copyrightText } = req.body;
        if (typeof (copyrightText) == 'undefined') return res.status(400).json({ message: `copyrightText field should be provided` })

        const footerArr = await Footer.find()
        const footerObj = footerArr[0]
        const footerObjId = footerObj._id
        if (!footerObj) return res.status(400).json({ message: 'footer document has not been created yet' })

        footerObj.copyrightText = copyrightText
        await Footer.findByIdAndUpdate(footerObjId, footerObj, { new: true })
        res.status(200).json({ result: footerObj.copyrightText, message: 'copyrightText of footer content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateCopyRight - footer.js - controllers', error })
    }
}



export const deleteFooterSection = async (req, res) => {
    try {
        const result = await Footer.deleteMany()
        res.status(200).json({ result, message: `footer collection deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteFooterSection - footer.js - controllers', error })
    }
}