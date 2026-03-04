import express, { RequestHandler }  from "express";
import cors,{CorsOptions} from "cors";

const corsOptions: CorsOptions = {
    origin: "http://localhost:5173",
    methods:["GET","PUT", "DELETE","POST"],
 allowedHeaders: ["Content-Type", "Authorization"],
};
const app = express();
app.use(cors(corsOptions)) as RequestHandler;
app.use(express.json());

app.get("/api/ping", (_req, res) =>{
    res.send("hello world");
});

const PORT = 3001;
app.listen(PORT, ()=> {
    console.log("the server is running at port:", PORT);
});