import "dotenv/config";import express from "express";import cors from "cors";
import {analyzeImage} from "./analyze.js";
const app=express();app.use(cors({origin:process.env.ALLOWED_ORIGIN||true}));app.use(express.json({limit:"30mb"}));
app.get("/api/health",(_q,r)=>r.json({ok:true,visionKeyConfigured:!!process.env.VISION_API_KEY,model:process.env.VISION_MODEL||"claude-sonnet-5-5"}));
app.post("/api/analyze-image",async(req,res)=>{try{const{status,json}=await analyzeImage(req.body);res.status(status).json(json)}catch(e){console.error("[analyze] unexpected:",e.message);res.status(500).json({success:false,code:"SERVER_ERROR",error:"Unexpected server error.",detail:String(e.message).slice(0,120)})}});
app.listen(process.env.PORT||5000,()=>console.log("RE-THREAD API on",process.env.PORT||5000,"| key configured:",!!process.env.VISION_API_KEY));
