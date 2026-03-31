import express from "express";
import {fromNodeHeaders, toNodeHandler} from "better-auth/node"
import dotenv from "dotenv";
import cors from "cors";
import { auth } from "./lib/auth.js";
dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.all("/api/auth/*splat",toNodeHandler(auth))
app.use(express.json());

app.get("/api/me",async(req,res)=>{
 const session = await auth.getSession({
    headers:fromNodeHeaders(req.headers),
 })
 return res.json(session);
})

app.get('/health',async(req,res)=>{
    res.send("Okk");
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})