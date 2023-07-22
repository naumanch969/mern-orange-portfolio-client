import express from "express"
const router = express.Router()

import {
    getPortfolioContent,
} from "../controllers/portfolio.js"



router.get('/get-portfolio-content', getPortfolioContent)

export default router