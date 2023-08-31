import express from "express"
import mongoose from "mongoose"
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"
import cors from "cors"
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()
dotenv.config()

import generalRoutes from "./routes/general.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import resumesRoutes from "./routes/resumes.js"
import servicesRoutes from "./routes/services.js"
import skillsRoutes from "./routes/skills.js"
import projectsRoutes from "./routes/projects.js"
import blogsRoutes from "./routes/blogs.js"
import testimonialsRoutes from "./routes/testimonials.js"
import freelancingRoutes from "./routes/freelancing.js"
import contactRoutes from "./routes/contact.js"
import { upload } from "./multer.js"


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.ATLAS_URL

app.use(cors())
app.use(cookieParser());
app.use(express.json());

// serving static files | images
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use('/', generalRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/resume', resumesRoutes);
app.use('/service', servicesRoutes);
app.use('/skill', skillsRoutes);
app.use('/project', projectsRoutes);
app.use('/blog', blogsRoutes);
app.use('/testimonial', testimonialsRoutes);
app.use('/freelancing', freelancingRoutes);
app.use('/contact', contactRoutes);


app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong'
    const status = err.status || 500
    res.status(status).json({ message, status, stack: err.stack })
    next()
})





app.get("/", (_req, res) => {
    res.status(200).send("App is Working")
})

mongoose.set('strictQuery', false);
mongoose.connect(CONNECTION_URL)
    .then(
        () => app.listen(PORT, () => console.log(`listening at port ${PORT}`))
    )
    .catch(
        (err) => console.log(`the error to connect to mongodb is "${err}"`)
    ) 