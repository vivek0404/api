
const express = require("express");
const mongoose = require("mongoose");
const bodyparser =require("body-parser");
const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://vivek:vivek0404@cluster0.swrbp.mongodb.net/sampleproduct").then(()=>{
    console.log("mongoose running");
}).catch((err)=>{
    console.log(err);
});

app.use(bodyparser.urlencoded({extended:false}));

const productschema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number
})
const Product = new mongoose.model('product',productschema);

app.post("/api/v1/product/new",async(req,res)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
})

app.get("/api/v1/products", async(req,res)=>{

    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
})

app.put("/api/v1/product/:id", async(req,res)=>{

    let product = await Product.findById(req.params.id);
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,useFindAndModify:true,runValidators:true})
    res.status(200).json({
        success:true,
        product
    })
})

app.delete("/api/v1/product/:id",async(req,res)=>{
    let product = await Product.findById(req.params.id);
    product.remove();

    res.status(2000).json({
        success:true,
        message:"product deleted"
    })
})

app.listen(5000, ()=>{
    console.log("server is running http://localhost:5000");
})