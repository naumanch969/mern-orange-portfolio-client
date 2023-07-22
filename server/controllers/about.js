import About from "../models/about.js";
import User from "../models/user.js";


export const getAboutContent = async (req, res) => {
    try {

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]

        if (!aboutObj) return res.status(200).json({ result: { aboutDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: aboutObj, message: 'about content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getAboutContent - about.js - controllers', error })
    }
}

export const createAboutContent = async (req, res) => {
    try {
        const [forwardHeading, backHeading, detail, name, DOB, address, phone, email, subText, buttons, images] = ['', '', '', '', '', '', 0, '', '', [], []];
        const aboutArr = await About.find()
        if (aboutArr.length > 0) return res.status(400).json({ message: 'there should only be one About document. So this post action can not be proceed.' })  // if about document is already created

        const result = await About.create({ forwardHeading, backHeading, detail, name, DOB, address, phone, email, subText, buttons, images })
        res.status(200).json({ result, message: 'about content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createAboutaboutArr - controllers', error })
    }
}








export const addImage = async (req, res) => {
    try {
        const { file, url } = req.body;

        const content = await About.find()
        const about = content[0]
        const aboutId = about._id

        if (!about) return res.status(400).json({ message: 'about document has not been created yet' })
        about.images = about.images.concat({ file, url })
        await About.findByIdAndUpdate(aboutId, about, { new: true })
        res.status(200).json({ result: about.images, message: 'images of about content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addAboutImage - about.js - controllers', error })
    }
}
export const deleteImage = async (req, res) => {
    try {
        const { imageId } = req.params

        const aboutArr = await About.find()
        const about = aboutArr[0]
        const aboutObjId = about._id
        if (!about) return res.status(400).json({ message: 'about document has not been created yet' })

        const findedImage = about.images.find(image => image._id == imageId)
        if (!findedImage) return res.status(400).json({ message: `image with id ${imageId} is not exist` })

        about.images = about.images.filter(image => image._id != imageId)
        await About.findByIdAndUpdate(aboutObjId, about, { new: true })
        res.status(200).json({ result: about.images, message: 'images of about aboutArr updated successfully' })
    } catch (error) {
        res.status(404).json({ message: 'error in deleteimages - about.js - controllers', error })
    }
}







export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.forwardHeading = forwardHeading
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.forwardHeading, message: 'forwardHeading of About content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - controllers', error })
    }
}

export const updateBackHeading = async (req, res) => {
    try {
        const { backHeading } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })

        aboutObj.backHeading = backHeading
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.backHeading, message: 'backHeading of About content updated successfully' })


    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - controllers', error })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.detail = detail
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.detail, message: 'detail of About content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - controllers', error })
    }
}

export const updateName = async (req, res) => {
    try {
        const { name } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.name = name
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.name, message: 'name of About content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateName - controllers', error })
    }
}

export const updateDOB = async (req, res) => {
    try {
        const { DOB } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.DOB = DOB
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.DOB, message: 'DOB of About content updated successfully' })


    } catch (error) {
        res.status(404).json({ message: 'error in updateDOB - controllers', error })
    }
}

export const updateAddress = async (req, res) => {
    try {
        const { address } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.address = address
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.address, message: 'address of About content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateAddress - controllers', error })
    }
}

export const updatePhone = async (req, res) => {
    try {
        const { phone } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        else {
            aboutObj.phone = phone
            await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
            res.status(200).json({ result: aboutObj.phone, message: 'phone of About content updated successfully' })
        }

    } catch (error) {
        res.status(404).json({ message: 'error in updatePhone - controllers', error })
    }
}

export const updateEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.email = email
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.email, message: 'email of About content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateEmail - controllers', error })
    }
}

export const updatesubText = async (req, res) => {
    try {
        const { subText } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.subText = subText
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.subText, message: 'subText of About content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updatesubText - controllers', error })
    }
}






export const addButton = async (req, res) => {
    try {
        const { text, variant } = req.body;
        const content = await About.find()
        const aboutObj = content[0]
        const aboutObjId = aboutObj._id
        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })

        aboutObj.buttons = aboutObj.buttons.concat({ text, variant })
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.buttons, message: `button of text ${text} of about content added successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in addButton - about.js - controllers', error })
    }
}

export const updateButton = async (req, res) => {
    try {
        const { buttonId } = req.params
        const { text, variant } = req.body;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        const findedButton = aboutObj.buttons.find(button => button._id == buttonId)

        if (!findedButton) return res.status(400).json({ message: `button wit id ${buttonId} is not exist` })
        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        findedButton.text = text
        findedButton.variant = variant
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.buttons, message: `button of id ${buttonId} and text ${text} of about content updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateButton - about.js - controllers', error })
    }
}

export const deleteButton = async (req, res) => {
    try {

        const { buttonId } = req.params;

        const aboutArr = await About.find()
        const aboutObj = aboutArr[0]
        const aboutObjId = aboutObj._id

        if (!aboutObj) return res.status(400).json({ message: 'about document has not been created yet' })
        aboutObj.buttons = aboutObj.buttons.filter(button => button._id != buttonId)
        await About.findByIdAndUpdate(aboutObjId, aboutObj, { new: true })
        res.status(200).json({ result: aboutObj.buttons, message: `button of id ${buttonId} of about content deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteButton - about.js - controllers', error })
    }
}








export const deleteAboutCollection = async (req, res) => {
    try {

        await About.deleteMany()
        res.status(200).json({ result: { ...result, aboutDocumentNotExist: true }, message: `about collection deleted successfully` })

    } catch (error) {
        res.status(500).json({ error, message: "error in deleteAboutCollection - controllers" })
    }
}
