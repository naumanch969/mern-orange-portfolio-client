import Contact from "../models/contact.js";
import ContactUser from '../models/contactUser.js'
import nodemailer from 'nodemailer'

function capitalizeEachWord(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
            return word
            .charAt(0)
            .toUpperCase()
            + word
            .slice(1);
        })
        .join(' ');
}

export const formSubmit = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) return res.status(400).json({ message: `name, email, subject, message fields are required` })

        const html = `
            <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
                <h2 style="color: #0077c0;">Portfolio Contact Form Submission</h2>
                <hr style="border: 0; border-top: 1px solid #0077c0;">
                <p><strong>Name:</strong> ${capitalizeEachWord(name)}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${capitalizeEachWord(subject)}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
        `;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.SENDER_EMAIL, pass: process.env.SENDER_EMAIL_PASSWORD }
        });
        const mailOptions = {
            from: email,
            to: process.env.SENDER_EMAIL,
            subject: `${capitalizeEachWord(name)} Contacted You`,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);       // console.log the info (for detail)

        if (info.accepted.length > 0) {
            const contactUser = await ContactUser.create({ name, email, subject, message });
            res.status(200).json({ success: true, message: 'contact user createad successfully' })
        }

    } catch (error) {
        res.status(500).send('An error occurred while sending the email.');
    }
};



export const getContactContent = async (req, res) => {
    try {
        const contactArr = await Contact.find()
        const contactObj = contactArr[0]

        if (!contactObj) return res.status(200).json({ result: { contactDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: contactObj, message: 'contact content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getContactContent - contact.js - controllers', error })
    }
}

export const createContactContent = async (req, res) => {
    try {
        const [forwardHeading, backHeading, detail, cards, images, inputs, buttons] = ['', '', '', [], [], {}, []];
        const contactArr = await Contact.find()
        if (contactArr.length > 0) return res.status(400).json({ message: 'there should only be one Contact document. So this post action can not be proceed.' })

        const result = await Contact.create({ forwardHeading, backHeading, detail, cards, images, inputs, buttons })
        res.status(200).json({ result, message: 'contact content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createContactContent - contact.js - controllers', error })
    }
}







export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id

        if (!contactObj) {
            res.status(400).json({ message: 'contact document has not been created yet' })
        }
        if (typeof (forwardHeading) == 'undefined') res.status(400).json({ message: `make sure to provide all name, email, subject and message fields` })
        else {
            contactObj.forwardHeading = forwardHeading
            await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
            res.status(200).json({ result: contactObj.forwardHeading, message: 'forwardHeading of Contact content updated successfully' })
        }
    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - controllers', error })
    }
}

export const updateBackHeading = async (req, res) => {
    try {
        const { backHeading } = req.body;
        if (typeof (backHeading) == 'undefined') return res.status(400).json({ message: `make sure to provide all name, email, subject and message fields` })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        contactObj.backHeading = backHeading
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.backHeading, message: 'backHeading of contact content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - controllers', error })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (typeof (detail) == 'undefined') return res.status(400).json({ message: `make sure to provide all name, email, subject and message fields` })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        contactObj.detail = detail
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.detail, message: 'detail of contact content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - controllers', error })
    }
}









export const addContactCard = async (req, res) => {
    try {
        const { icon, title, detail } = req.body;
        if (typeof (icon) == 'undefined' || typeof (title) == 'undefined' || typeof (detail) == 'undefined') return res.status(400).json({ message: `make sure to provide all name, email, subject and message fields` })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        contactObj.cards = contactObj.cards.concat({ icon, title, detail })
        await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.cards, message: 'contact card added updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addContactCard - contact.js - controllers', error })
    }
}

export const updateContactCard = async (req, res) => {
    try {
        const { cardId } = req.params
        const { icon, title, detail } = req.body;
        if (typeof (icon) == 'undefined' || typeof (title) == 'undefined' || typeof (detail) == 'undefined') return res.status(400).json({ message: `make sure to provide all name, email, subject and message fields` })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj?._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        const findedContactCard = contactObj.cards.find((card) => card._id == cardId)
        if (!findedContactCard) return res.status(400).json({ message: `no contact card exist with id ${cardId} ` })

        findedContactCard.icon = icon
        findedContactCard.title = title
        findedContactCard.detail = detail
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: findedContactCard, contactCardId: cardId, message: `contact card of id ${cardId} updated updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateContactCard - contact.js - controllers', error })
    }
}

export const deleteContactCard = async (req, res) => {
    try {
        const { cardId } = req.params

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj?._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        const findedContactCard = contactObj.cards.find((card) => card._id == cardId)
        if (!findedContactCard) return res.status(400).json({ message: `no contact card exist with id ${cardId} ` })

        contactObj.cards = contactObj.cards.filter(card => card._id != cardId)
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.cards, message: `contact card of id ${cardId} deleted updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateContactCard - contact.js - controllers', error })
    }
}









export const addContactImage = async (req, res) => {
    try {
        const { file, url } = req.body;
        if (typeof (file) == 'undefined' || typeof (url) == 'undefined') res.status(400).json({ message: `make sure to provide all name, email, subject and message fields` })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        contactObj.images = contactObj.images.concat({ file, url })
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.images, message: 'images of contact content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addContactImage - contact.js - controllers', error })
    }
}


export const deleteContactImage = async (req, res) => {
    try {
        const { imageId } = req.params

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) res.status(400).json({ message: 'contact document has not been created yet' })

        const findedImage = contactObj.images.find(image => image._id == imageId)
        if (!findedImage) return res.status(400).json({ message: `image with id ${imageId} is not exist` })

        contactObj.images = contactObj.images.filter(image => image._id != imageId)
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.images, message: 'images deleted successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteContactImage - contact.js - controllers', error })
    }
}










export const updateInputs = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (typeof (name) == 'undefined' || typeof (email) == 'undefined' || typeof (subject) == 'undefined' || typeof (message) == 'undefined') res.status(400).json({ message: `make sure to provide all name, email, subject and message fields` })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        contactObj.inputs.name = name
        contactObj.inputs.email = email
        contactObj.inputs.subject = subject
        contactObj.inputs.message = message
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.inputs, message: 'backHeading of contact content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateInputs - contact.js - controllers', error })
    }
}









export const addButton = async (req, res) => {
    try {
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || typeof (variant) == 'undefined') res.status(400).json({ message: 'text and variant fields should be provided' })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) res.status(400).json({ message: 'contact document has not been created yet' })


        contactObj.buttons = contactObj.buttons.concat({ text, variant })
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.buttons, message: `button of text ${text} of contact content added successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in addButton - Contact.js - controllers', error })
    }
}

export const updateButton = async (req, res) => {
    try {
        const { buttonId } = req.params
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || typeof (variant) == 'undefined') res.status(400).json({ message: 'contact document has not been created yet' })

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) res.status(400).json({ message: 'contact document has not been created yet' })

        const findedButton = contactObj.buttons.find(button => button._id == buttonId)
        if (!findedButton) return res.status(400).json({ message: `button wit id ${buttonId} is not exist` })


        findedButton.text = text
        findedButton.variant = variant
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.buttons, message: `button of id ${buttonId} and text ${text} of contact content updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateButton - Contact.js - controllers', error })
    }
}

export const deleteButton = async (req, res) => {
    try {
        const { buttonId } = req.params;

        const contactArr = await Contact.find()
        const contactObj = contactArr[0]
        const contactObjId = contactObj._id
        if (!contactObj) return res.status(400).json({ message: 'contact document has not been created yet' })

        contactObj.buttons = contactObj.buttons.filter(button => button._id != buttonId)
        const result = await Contact.findByIdAndUpdate(contactObjId, contactObj, { new: true })
        res.status(200).json({ result: contactObj.buttons, message: `button of id ${buttonId} of contact content deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteButton - Contact.js - controllers', error })
    }
}




export const deleteContactCollection = async (req, res) => {
    try {
        const result = await Contact.deleteMany()
        res.status(200).json({ result: { ...result, contactDocumentNotExist: true }, message: `Contact collection deleted successfully` })

    } catch (error) {
        res.status(500).json({ error, message: "error in deleteContactCollection - controllers" })
    }
}