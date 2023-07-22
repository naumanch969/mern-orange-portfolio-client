import Home from "../models/home.js";

export const getHomeContent = async (req, res) => {
    try {
        const homeArr = await Home.find()
        const homeObj = homeArr[0]
        if (!homeObj) return res.status(200).json({ result: { homeDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: homeObj, message: 'home content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getHomeContent - home.js - controllers', error })
    }
}
export const createHomeContent = async (req, res) => {
    try {
        const { helloText, heading1, subHeading1, heading2, buttons, images } = ['', '', '', '', [], []];

        const content = await Home.find()
        if (content.length > 0) return res.status(400).json({ message: 'there should only be one home document. So this post action can not be proceed.' })

        const result = await Home.create({ helloText, heading1, subHeading1, heading2, buttons, images })
        res.status(200).json({ result, message: 'home content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createHomeContent - home.js - controllers', error })
    }
}



export const updateHelloText = async (req, res) => {
    try {
        const { helloText } = req.body;

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id

        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })
        if (typeof (helloText) == 'undefined') return res.status(400).json({ message: 'helloText field should be provided' })

        homeObj.helloText = helloText
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: helloText, message: 'helloText updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateHelloText - home.js - controllers', error })
    }
}
export const updateHeading1 = async (req, res) => {
    try {
        const { heading1 } = req.body;

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id

        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })
        if (typeof (heading1) == 'undefined') return res.status(400).json({ message: 'heading1 field should be provided' })
        homeObj.heading1 = heading1
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: heading1, message: 'heading1 updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateHeading1 - home.js - controllers', error })
    }
}
export const updateSubHeading1 = async (req, res) => {
    try {
        const { subHeading1 } = req.body;

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id

        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })
        if (typeof (subHeading1) == 'undefined') return res.status(400).json({ message: 'subHeading1 field should be provided' })
        homeObj.subHeading1 = subHeading1
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: subHeading1, message: 'subHeading1 content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateSubHeading1 - home.js - controllers', error })
    }
}
export const updateHeading2 = async (req, res) => {
    try {
        const { heading2 } = req.body;

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id

        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })
        if (typeof (heading2) == 'undefined') return res.status(400).json({ message: 'heading2 field should be provided' })
        homeObj.heading2 = heading2
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: heading2, message: 'heading2 of home content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateHeading2 - home.js - controllers', error })
    }
}



export const addHomeImage = async (req, res) => {
    try {
        const { file, url } = req.body;

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id

        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })
        if (!file || !url) return res.status(400).json({ message: 'file and url field should be provided' })
        homeObj.images = homeObj.images.concat({ file, url })
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: homeObj.images, message: 'images of home content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addHomeImage - home.js - controllers', error })
    }
}
export const deleteHomeImage = async (req, res) => {
    try {
        const { imageId } = req.params
        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id

        const findedImage = homeObj.images.find(image => image._id == imageId)

        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })
        if (!findedImage) return res.status(400).json({ message: `image with id ${imageId} is not exist` })
        homeObj.images = homeObj.images.filter(image => image._id != imageId)

        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: homeObj.images, message: `image of id ${imageId} of home content deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteHomeImage - home.js - controllers', error })
    }
}




export const addButton = async (req, res) => {
    try {
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || !variant) return res.status(400).json({ message: 'text and variant field should be provided' })

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id
        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })

        homeObj.buttons = homeObj.buttons.concat({ text, variant })
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: homeObj.buttons, message: `button added successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in addButton - home.js - controllers', error })
    }
}
export const updateButton = async (req, res) => {
    try {
        const { buttonId } = req.params
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || !variant) res.status(400).json({ message: 'text and variant field should be provided' })

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id
        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })

        const findedButton = homeObj.buttons.find(button => button._id == buttonId)
        if (!findedButton) return res.status(400).json({ message: `button wit id ${buttonId} is not exist` })

        findedButton.text = text
        findedButton.variant = variant
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: homeObj.buttons, message: `button updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateButton - home.js - controllers', error })
    }
}
export const deleteButton = async (req, res) => {
    try {
        const { buttonId } = req.params;
        if (!buttonId) return res.status(400).json({ message: 'buttonId should be provided through params' })

        const content = await Home.find()
        const homeObj = content[0]
        const homeId = homeObj._id
        if (!homeObj) return res.status(400).json({ message: 'home document has not been created yet' })

        homeObj.buttons = homeObj.buttons.filter(button => button._id != buttonId)
        await Home.findByIdAndUpdate(homeId, homeObj, { new: true })
        res.status(200).json({ result: homeObj.buttons, message: `button deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteButton - home.js - controllers', error })
    }
}




export const deleteHomeCollection = async (req, res) => {
    try {
        const result = await Home.deleteMany()
        res.status(200).json({ result: { ...result, homeDocumentNotExist: true }, message: `Home collection deleted successfully` })

    } catch (error) {
        res.status(500).json({ error, message: "error in deleteHomeCollection - controllers" })
    }
}