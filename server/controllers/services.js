import mongoose from "mongoose";
import Services from "../models/services.js";



export const getServicesContent = async (req, res) => {
    try {
        const servicesArr = await Services.find()
        const servicesObj = servicesArr[0]
        if (!servicesObj) return res.status(200).json({ result: { servicesDocumentNotExist: true }, message: 'first document has not been created yet.' })

        res.status(200).json({ result: servicesObj, message: 'services content get successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in getServicesContent - services.js - controllers', error })
    }
}
export const createServicesContent = async (req, res) => {
    try {
        const { forwardHeading, backHeading, detail, services } = ['', '', '', []];

        const servicesArr = await Services.find()
        if (servicesArr.length > 0) return res.status(400).json({ message: 'there should only be one services document. So this post action can not be proceed.' })

        const result = await Services.create({ forwardHeading, backHeading, detail, services })
        res.status(200).json({ result, message: 'services content created successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in createServicesContent - services.js - controllers', error })
    }
}






export const updateForwardHeading = async (req, res) => {
    try {
        const { forwardHeading } = req.body;

        const servicesArr = await Services.find()
        const servicesObj = servicesArr[0]
        const servicesObjId = servicesObj._id

        if (!servicesObj) return res.status(400).json({ message: 'first services document has not been created yet' })
        if (typeof (forwardHeading) == 'undefined') return res.status(400).json({ message: `forwardHeading field sould be provided` })

        servicesObj.forwardHeading = forwardHeading
        await Services.findByIdAndUpdate(servicesObjId, servicesObj, { new: true })
        res.status(200).json({ result: forwardHeading, message: 'forwardHeading of Services content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateForwardHeading - controllers', error })
    }
}

export const updateBackHeading = async (req, res) => {
    try {
        const { backHeading } = req.body;
        if (typeof (backHeading) == 'undefined') return res.status(400).json({ message: `backHeading field sould be provided` })

        const servicesArr = await Services.find()
        const servicesObj = servicesArr[0]
        const servicesObjId = servicesObj._id
        if (!servicesObj) return res.status(400).json({ message: 'services document has not been created yet' })

        servicesObj.backHeading = backHeading
        await Services.findByIdAndUpdate(servicesObjId, servicesObj, { new: true })
        res.status(200).json({ result: backHeading, message: 'backHeading of services content updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateBackHeading - controllers', error })
    }
}

export const updateDetail = async (req, res) => {
    try {
        const { detail } = req.body;
        if (typeof (detail) == 'undefined') return res.status(400).json({ message: `detail field sould be provided` })

        const servicesArr = await Services.find()
        const servicesObj = servicesArr[0]
        const servicesObjId = servicesObj._id
        if (!servicesObj) return res.status(400).json({ message: 'services document has not been created yet' })

        servicesObj.detail = detail
        await Services.findByIdAndUpdate(servicesObjId, servicesObj, { new: true })
        res.status(200).json({ result: detail, message: 'detail updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateDetail - controllers', error })
    }
}








export const addService = async (req, res) => {
    try {
        const { icon, service, link } = req.body;
        if (typeof (icon) == 'undefined' || typeof (service) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `icon, service, link fields sould be provided` })

        const servicesArr = await Services.find()
        const servicesObj = servicesArr[0]
        const servicesObjId = servicesObj._id
        if (!servicesObj) return res.status(400).json({ message: 'services document has not been created yet' })

        servicesObj.services = servicesObj.services.concat({ icon, service, link })
        await Services.findByIdAndUpdate(servicesObjId, servicesObj, { new: true })
        res.status(200).json({ result: servicesObj.services, message: 'service added successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in addservice - services.js - controllers', error })
    }
}

export const updateService = async (req, res) => {
    try {
        const { serviceId } = req.params
        const { icon, service, link } = req.body;
        if (typeof (icon) == 'undefined' || typeof (service) == 'undefined' || typeof (link) == 'undefined') return res.status(400).json({ message: `icon, service, link fields sould be provided` })

        const servicesArr = await Services.find()
        const servicesObj = servicesArr[0]
        const servicesObjId = servicesObj._id
        if (!servicesObj) return res.status(400).json({ message: 'services document has not been created yet' })

        const findedService = servicesObj.services.find((service) => service._id == serviceId)
        if (!findedService) return res.status(400).json({ message: `no service exists with id ${serviceId} ` })

        findedService.icon = icon
        findedService.service = service
        findedService.link = link
        await Services.findByIdAndUpdate(servicesObjId, servicesObj, { new: true })
        res.status(200).json({ result: findedService, message: 'service updated successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateService - services.js - controllers', error })
    }
}

export const deleteService = async (req, res) => {
    try {
        const { serviceId } = req.params

        const content = await Services.find()
        const servicesObj = content[0]
        const servicesObjId = servicesObj._id
        if (!servicesObj) return res.status(400).json({ message: 'services document has not been created yet' })

        const findedService = servicesObj.services.find((service) => service._id == serviceId)
        if (!findedService) return res.status(400).json({ message: `no service exists with id ${serviceId} ` })

        servicesObj.services = servicesObj.services.filter(service => service._id != serviceId)
        await Services.findByIdAndUpdate(servicesObjId, servicesObj, { new: true })
        res.status(200).json({ result: servicesObj.services, message: 'service deleted successfully' })

    } catch (error) {
        res.status(404).json({ message: 'error in updateService - services.js - controllers', error })
    }
}




export const deleteServicesCollection = async (req, res) => {
    try {
        const result = await Services.deleteMany()
        res.status(200).json({ result: { ...result, servicesDocumentNotExist: true }, message: `Services collection deleted successfully` })
    } catch (error) {
        res.status(500).json({ error, message: "error in deleteServicesCollection - controllers" })
    }
}