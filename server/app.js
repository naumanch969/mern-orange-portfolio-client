import express from "express"
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from "cors"

const app = express()
dotenv.config()

import userRoutes from "./Routes/user.js"
import portfolioRoutes from "./Routes/portfolio.js"
import navbarRoutes from "./Routes/navbar.js"
import homeRoutes from "./Routes/home.js"
import aboutRoutes from "./Routes/about.js"
import resumesRoutes from "./Routes/resumes.js"
import servicesRoutes from "./Routes/services.js"
import skillsRoutes from "./Routes/skills.js"
import projectsRoutes from "./Routes/projects.js"
import blogsRoutes from "./Routes/blogs.js"
import testimonialsRoutes from "./Routes/testimonials.js"
import freelancingRoutes from "./Routes/freelancing.js"
import contactRoutes from "./Routes/contact.js"
import footerRoutes from "./Routes/footer.js"


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGOOSE_CONNECTION_URL
 
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' })); // define the size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));	// define the size limit
app.use(bodyParser.json())

app.use(cookieParser());
app.use(express.json());

app.use('/portfolio', portfolioRoutes);
app.use('/portfolio/user', userRoutes);
app.use('/portfolio/navbar', navbarRoutes);
app.use('/portfolio/home', homeRoutes);
app.use('/portfolio/about', aboutRoutes);
app.use('/portfolio/resumes', resumesRoutes);
app.use('/portfolio/services', servicesRoutes);
app.use('/portfolio/skills', skillsRoutes);
app.use('/portfolio/projects', projectsRoutes);
app.use('/portfolio/blogs', blogsRoutes);
app.use('/portfolio/testimonials', testimonialsRoutes);
app.use('/portfolio/freelancing', freelancingRoutes);
app.use('/portfolio/contact', contactRoutes);
app.use('/portfolio/footer', footerRoutes);


mongoose.set('strictQuery', false);

app.get("/", (_req, res) => {
    res.status(200).send("App is Working")
})

 
mongoose.connect(CONNECTION_URL)
    .then(
        () => app.listen(PORT, () => console.log(`listening at port ${PORT}`))
    )
    .catch( 
        (err) => console.log(`the error to connect to mongodb is "${err}"`)
    ) 