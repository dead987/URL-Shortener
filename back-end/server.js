import express from "express";
import { userRoutes } from "./src/api/v1/routes/user-routes.js";
import { middleWare } from "./src/utils/middleware/404.js";
import { connectToDB } from "./src/utils/db/connection.js";
import dotenv from 'dotenv';
import cors from 'cors';
import { urlRoute } from "./src/api/v1/routes/url-short-routes.js";
const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());
app.use('/', userRoutes);
app.use('/',urlRoute);
app.use(middleWare);
const promise = connectToDB();
promise.then(result=>{
    console.log("DB success");
    const server = app.listen(5000, err => {
    if(err) {
        console.log("Server Crashed",err);
    }
    else {
        console.log("Server up and running: ",server.address().port);
    }
});
}).catch(err=>{
    console.log("DB failed",err);
})

