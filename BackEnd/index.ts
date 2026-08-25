import express, {Express,Request,Response} from "express";
import cors from "cors";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import HotelRoutes from "./routes/HotelRoutes";
import DestinationRoutes from "./routes/DestinationRoutes";
import TransportationRoutes from "./routes/TransportationRoutes";
import PackageRoutes from "./routes/PackageRoute";
import BookingRoutes from "./routes/BookingRoutes";
import UpdateRoutes from "./routes/UpdateRoutes";

const app: Express = express();

app.use(cors());  
app.use(express.json());

app.get("/", (req: Request,res: Response) => {
    res.send("Hello from express server");
})


app.use("/",UserRoutes);

app.use("/",AdminRoutes);

app.use("/",HotelRoutes);

app.use("/",DestinationRoutes);

app.use("/",TransportationRoutes);

app.use("/",PackageRoutes);

app.use("/",BookingRoutes);

app.use("/",UpdateRoutes);

app.listen(8081,() => {
    console.log("Listening");
})