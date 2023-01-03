const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyparser = require("body-parser");
const { json } = require("body-parser");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://0.0.0.0:27017/sam",{useNewUrlparser:true,useUnifiedTopology:true}).then(()=>{
    console.log("connected with mongodb")
}).catch((err)=>{
    console.log(err);
})
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json())

const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})

const product = new mongoose.model("product",productSchema)

app.post("/api/v1/product/new",async(req,res)=>{
   const Product = await product.create(req.body);
   res.status(201).json({
    success:true,
    Product
   })


})


app.get("/api/v1/products", async(req,res)=>{
    const products = await product.find();
    res.status(200).json({success:true,products})
})


app.put("/api/v1/product/:id",async(req,res)=>{

let Product = await product.findById(req.params.id)
Product = await product.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindAndModify:false,runValidators:true})

res.status(200).json({
    success:true,
    product
})

})


app.listen(4500,()=>{
    console.log("server is working http://localhost:4500")
})