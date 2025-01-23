import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { connectDB } from "./database/db.js";
import { TempleRouter } from "./routers/templeRouter.js";
import { Templerouter1 } from "./routers/templeRouter1.js";
import { HotelRouter } from "./routers/hotelRouter.js";
import { destinationRouter } from "./routers/destinationRouter.js";
import { experiencesRouter } from "./routers/experiencesRouter.js";
import { travelRouter } from "./routers/travelsRouter.js";
import { UploadRouter } from "./routers/ImageRoutes.js";
import { authRouter } from "./routers/authRoutes.js";
import { stateRouter } from "./routers/stateRouter.js";
import { sliderRouter } from "./routers/slider_1Router.js";
import { exploreMoreRouter } from "./routers/exploreMoreRouter.js";
import { blogRouter } from "./routers/blogRoutes.js";
import { searchRoute } from './routers/searchRoute.js';
import { cityRoute } from "./routers/cityRoute.js";

import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {Server} from "socket.io"

dotenv.config();
const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "PUT,POST,GET,DELETE,PATCH,HEAD",
  })
);

// const io = new Server(8080,{ 
//   cors: {
//   origin: "http://localhost:3000",
//   }
// })

// io.on('connection',(socket)=>{
//        console.log("A user Connected",socket.id)

//         socket.on('chatMessage',(message)=>{
//         console.log("new message recevied :",message)

//         socket.broadcast.emit('chatMessage',message)
//       })

//         socket.on('disconnect',()=>{
//             console.log("A user disconnected",socket.id)
//         })
// })

const __filename = fileURLToPath(import.meta.url);
const _dirName = dirname(__filename);
app.use("/public", express.static(path.join(_dirName, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin", authRouter);
app.use("/api/v3", destinationRouter);
app.use("/api/v5", experiencesRouter);
app.use("/api/v6", travelRouter);
app.use("/api/v2", HotelRouter);
app.use("/api", stateRouter);
app.use("/api", TempleRouter);
app.use("/api/v1", Templerouter1);
app.use("/api/v4", UploadRouter);
app.use("/api/v7", sliderRouter);
app.use("/api", exploreMoreRouter);
app.use('/api',blogRouter)
app.use('/api',searchRoute);
app.use('/api',cityRoute);

app.listen(PORT, () => {
  console.log(`my server is running on the PORT ${PORT}`);
});


