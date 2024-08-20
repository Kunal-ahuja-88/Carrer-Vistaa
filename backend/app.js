import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js"

const app = express();

app.use(cors(
    { origin: [process.env.FRONTEND_URL], 
        methods : ["GET","PUT","POST","DELETE"],
        credentials: true 
    },
));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/user",userRouter)

export default app;
