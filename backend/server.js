const express=require("express");
const app=express();
const pool=require('./db');
const route=require("./src/routes");
const cors = require("cors");

pool.connect();
app.use(express.json());
app.use(cors());
app.use("/api",route);
app.listen(8000,()=>console.log("app listening on port 8000"));