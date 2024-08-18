import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

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

export default app;
