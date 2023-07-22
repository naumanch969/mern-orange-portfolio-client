import Freelancing from "../models/freelancing.js";


export const getFreelancingContent = async (req, res) => {
    try {
        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]

        if (!freelancingObj) return res.status(200).json({ result: { freelancingDocumentNotExist: true }, message: 'first document has not been created yet.' })
        res.status(200).json({ result: freelancingObj, message: 'freelancing content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getFreelancingContent - freelancing.js - controllers', error })
    }
}
export const createFreelancingContent = async (req, res) => {
    try {
        const { heading, detail, featureCards, freelancingCards, buttons } = ['', '', [], [], []];

        const freelancingArr = await Freelancing.find()
        if (freelancingArr.length > 0) return res.status(400).json({ message: 'there should only be one Freelancing document. So this post action can not be proceed.' })       // if Freelancing document is already created 
        const result = await Freelancing.create({ heading, detail, featureCards, freelancingCards, buttons })
        res.status(200).json({ result, message: 'freelancing content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createFreelancingContent - freelancing.js - controllers', error })
    }
}



export const updateHeading = async (req, res) => {
    try {
        const { heading } = req.body;
        if (typeof (heading) == 'undefined') return res.status(400).json({ message: `heading field sould be provided` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        freelancingObj.heading = heading
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: heading, message: 'heading of Freelancing content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateheading - freelancing.js - controllers', error })
    }
}
export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (typeof (detail) == 'undefined') return res.status(400).json({ message: `detail field sould be provided` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        freelancingObj.detail = detail
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: detail, message: 'detail of Freelancing content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - freelancing.js - controllers', error })
    }
}




export const addButton = async (req, res) => {
    try {
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || typeof (variant) == 'undefined') return res.status(400).json({ message: 'text and variant field should be provided' })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancingArr document has not been created yet' })

        freelancingObj.buttons = freelancingObj.buttons.concat({ text, variant })
        const result = await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: freelancingObj.buttons, message: `button of text ${text} of freelancing content added successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in addButton - freelancing.js - controllers', error })
    }
}
export const updateButton = async (req, res) => {
    try {
        const { buttonId } = req.params
        const { text, variant } = req.body;
        if (typeof (text) == 'undefined' || typeof (variant) == 'undefined') return res.status(400).json({ message: 'text and variant field should be provided' })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        const findedButton = freelancingObj.buttons.find(button => button._id == buttonId)
        if (!findedButton) return res.status(400).json({ message: `button with id ${buttonId} is not exist` })

        
        findedButton.text = text
        findedButton.variant = variant
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: freelancingObj.buttons, message: `button of id ${buttonId} and text ${text} of freelancing content updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateButton - freelancing.js - controllers', error })
    }
}
export const deleteButton = async (req, res) => {
    try {
        const { buttonId } = req.params;
        if (!buttonId) return res.status(400).json({ message: 'buttonId should be provided through params' })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        freelancingObj.buttons = freelancingObj.buttons.filter(button => button._id != buttonId)
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: freelancingObj.buttons, message: `button deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteButton - freelancing.js - controllers', error })
    }
}



export const addFeatureCard = async (req, res) => {
    try {
        const { title, quantity } = req.body;
        if (typeof (title) == 'undefined' || typeof (quantity) == 'undefined') return res.status(400).json({ message: `make sure to provide both title and quantity fields ` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        freelancingObj.featureCards = freelancingObj.featureCards.concat({ title, quantity })
        const result = await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: freelancingObj.featureCards, message: 'freelancing added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addFeatureCard - freelancing.js - controllers', error })
    }
}
export const updateFeatureCard = async (req, res) => {
    try {
        const { featureCardId } = req.params
        const { title, quantity } = req.body;
        if (typeof (title) == 'undefined' || typeof (quantity) == 'undefined') return res.status(400).json({ message: `make sure to provide both title and quantity fields ` })

        const content = await Freelancing.find()
        const freelancingObj = content[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        const findedFeatureCard = freelancingObj.featureCards.find((featureCard) => featureCard._id == featureCardId)
        if (!findedFeatureCard) return res.status(400).json({ message: `no featureCard exist with id ${featureCardId}` })

        findedFeatureCard.title = title
        findedFeatureCard.quantity = quantity
        const result = await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: findedFeatureCard, message: 'freelancing udpated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateFeatureCard - freelancing.js - controllers', error })
    }
}
export const deleteFeatureCard = async (req, res) => {
    try {
        const { featureCardId } = req.params

        const content = await Freelancing.find()
        const freelancingObj = content[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        const findedFeatureCard = freelancingObj.featureCards.find((featureCard) => featureCard._id == featureCardId)
        if (!findedFeatureCard) return res.status(400).json({ message: `no featureCard exist with id ${featureCardId}` })

        freelancingObj.featureCards = freelancingObj.featureCards.filter(card => card._id != featureCardId)
        const result = await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: freelancingObj.featureCards, message: `feature card of id ${featureCardId} delete successfully` })


    } catch (error) {
        res.status(404).json({ message: 'error in deleteFeatureCard - freelancing.js - controllers', error })
    }
}



// create
export const addFreelancingCard = async (req, res) => {
    try {
        const { title, cards, detail, images } = req.body;          // cards is like all gigs card
        if (typeof (title) == 'undefined' || typeof (cards) == 'undefined' || typeof (detail) == 'undefined' || typeof (images) == 'undefined') return res.status(400).json({ message: `title, cards, detail and images fields should be provided.` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        freelancingObj.freelancingCards = freelancingObj.freelancingCards.concat({ title, cards, detail, images })
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: freelancingObj.freelancingCards, message: 'freelancingCard added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addFeatureCard - freelancing.js - controllers', error })
    }
}
// update
export const updateFreelancingCardTitle = async (req, res) => {
    try {
        const { freelancingCardId } = req.params
        const { title } = req.body;
        if (typeof (title) == 'undefined') return res.status(400).json({ message: `title field should be provided` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        const findedFreelancingCard = freelancingObj.freelancingCards.find((card) => card._id == freelancingCardId)
        if (!findedFreelancingCard) return res.status(400).json({ message: `no freelancingCard exist with id ${freelancingCardId}` })

        findedFreelancingCard.title = title
        const result = await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: findedFreelancingCard, message: `title of freelancingCard of id ${freelancingCardId} updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateFreelancingCardTitle - controllers', error })
    }
}
export const updateFreelancingCardDetail = async (req, res) => {
    try {
        const { freelancingCardId } = req.params
        const { detail } = req.body;
        if (typeof (detail) == 'undefined') return res.status(400).json({ message: `detail field should be provided` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        const findedFreelancingCard = freelancingObj.freelancingCards.find((card) => card._id == freelancingCardId)
        if (!findedFreelancingCard) return res.status(400).json({ message: `no freelancingCard exist with id ${freelancingCardId}` })

        findedFreelancingCard.detail = detail
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: findedFreelancingCard, message: `detail of freelancingCard of id ${freelancingCardId} updated successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateFreelancingCardDetail - controllers', error })
    }
}
// delete
export const deleteFreelancingCard = async (req, res) => {
    try {
        const { freelancingCardId } = req.params

        const freelacingArr = await Freelancing.find()
        const freelancingObj = freelacingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        const findedFreelacingCard = freelancingObj.freelancingCards.find((card) => card._id == freelancingCardId)
        if (!findedFreelacingCard) return res.status(400).json({ message: `no freelacingCard exist with id ${freelancingCardId}` })

        freelancingObj.freelancingCards = freelancingObj.freelancingCards.filter(card => card._id != freelancingCardId)
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: freelancingObj.freelancingCards, message: `freelacing card of id ${freelancingCardId} deleted successfully` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteFreelancingCard - freelancing.js - controllers', error })
    }
}


export const addSubFreelancingCard = async (req, res) => {
    try {
        const { freelancingCardId } = req.params
        const { title, link, description, category, images } = req.body;
        if (typeof (title) == 'undefined' || typeof (link) == 'undefined' || typeof (description) == 'undefined' || typeof (category) == 'undefined' || typeof (images) == 'undefined') return res.status(400).json({ message: `title, link, description, category and images fields should be provided` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'Freelancing document has not been created yet' })

        const findedFreelancingCard = freelancingObj.freelancingCards.find((card) => card._id == freelancingCardId)
        if (!findedFreelancingCard) return res.status(400).json({ message: `no freelancing exist with id ${freelancingCardId}` })

        findedFreelancingCard.cards = findedFreelancingCard.cards.concat({ title, link, description, category, images })
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: findedFreelancingCard.cards, freelancingCardId, message: `card added to freelancingCard of id ${freelancingCardId}  successfully ` })

    } catch (error) {
        res.status(404).json({ message: 'error in addSubFreelancingCard - controllers', error })
    }
}
export const updateSubFreelancingCard = async (req, res) => {
    try {
        const { freelancingCardId } = req.params
        const { title, link, description, category, images, subCardId } = req.body;
        if (typeof (title) == 'undefined' || typeof (link) == 'undefined' || typeof (description) == 'undefined' || typeof (category) == 'undefined' || typeof (images) == 'undefined' || typeof (subCardId) == 'undefined') return res.status(400).json({ message: `title, link, description, category, images and subCardId fields should be provided` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'Freelancing document has not been created yet' })

        const findedFreelancingCard = freelancingObj.freelancingCards.find((card) => card._id == freelancingCardId)
        if (!findedFreelancingCard) return res.status(400).json({ message: `no freelancingCard exist with id ${freelancingCardId}` })

        const findedSubCard = findedFreelancingCard?.cards?.find(card => card._id == subCardId)
        if (!findedSubCard) return res.status(400).json({ message: `no subCard exist with id ${subCardId}` })

        findedSubCard.title = title
        findedSubCard.link = link
        findedSubCard.description = description
        findedSubCard.category = category
        findedSubCard.images = images
        await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: findedSubCard, freelancingCardId, subCardId, message: `subCard (gig card) updated successfully ` })

    } catch (error) {
        res.status(404).json({ message: 'error in updateSubFreelancingCard - controllers', error })
    }
}
export const deleteSubFreelancingCard = async (req, res) => {
    try {
        const { freelancingCardId } = req.params
        const { subCardId } = req.body;
        if (!subCardId) return res.status(400).json({ message: `subCardId field should be provided` })

        const freelancingArr = await Freelancing.find()
        const freelancingObj = freelancingArr[0]
        const freelancingObjId = freelancingObj._id
        if (!freelancingObj) return res.status(400).json({ message: 'freelancing document has not been created yet' })

        const findedFreelancingCard = freelancingObj.freelancingCards.find((card) => card._id == freelancingCardId)
        if (!findedFreelancingCard) return res.status(400).json({ message: `no freelancing exist with id ${freelancingCardId}` })

        const findedSubCard = findedFreelancingCard?.cards.find(card => card._id == subCardId)
        if (!findedSubCard) return res.status(400).json({ message: `no subCard exist with id ${subCardId}` })

        findedFreelancingCard.cards = findedFreelancingCard.cards.filter(card => card._id != subCardId)
        const result = await Freelancing.findByIdAndUpdate(freelancingObjId, freelancingObj, { new: true })
        res.status(200).json({ result: findedFreelancingCard.cards, message: `subCard of deleted successfully ` })

    } catch (error) {
        res.status(404).json({ message: 'error in deleteSubFreelancingCard - controllers', error })
    }
}








export const deleteFreelancingCollection = async (req, res) => {
    try {

        const result = await Freelancing.deleteMany()
        res.status(200).json({ result: { ...result, freelancingDocumentNotExist: true }, message: `Freelancing collection deleted successfully` })

    } catch (error) {
        res.status(500).json({ error, message: "error in deleteFreelancingCollection - controllers" })
    }
}