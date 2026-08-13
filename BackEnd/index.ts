import express, {Express,Request,Response} from "express";
import cors from "cors";
import AdminController from "./controllers/AdminController";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

const app: Express = express();

app.use(cors());  
app.use(express.json());

app.get("/", (req: Request,res: Response) => {
    res.send("Hello from express server");
})


app.use("/",UserRoutes);

app.use("/",AdminRoutes);

app.listen(8081,() => {
    console.log("Listening");
})