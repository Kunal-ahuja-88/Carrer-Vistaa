import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/connection.js"

dotenv.config({
    path : './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Process is running at Port ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log("MongoDB connection failed " , error);
})