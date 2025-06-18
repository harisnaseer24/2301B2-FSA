
import Product from "../models/productModel.mjs"
 let getAllProducts=async(req,res)=>{
try {
let products = await Product.find();
if (products.length ==0) {
       res.status(404).json({message:"No products found"});
} else {

    res.status(200).json({
    message:"Our Products",
    products:products,
})
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}

//product detail

 let getProduct=async(req,res)=>{
try {

    let id= req.params.id;
let product = await Product.find({_id:id});
if (!product) {
       res.status(404).json({message:"No products found"});
} else {

    res.status(200).json({
    message:"product found",
    product:product,
})
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}
///add product
 let addProduct=async(req,res)=>{
try {
let newProduct = new Product({
     title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        discountPercentage:req.body.discountPercentage,
        rating:req.body.rating,
        stock:req.body.stock,
        brand:req.body.brand,
        category:req.body.category,
        thumbnail:req.body.thumbnail,
        images:req.body.images

});


let addprod = await Product.insertOne(newProduct);
if (!addprod) {
       res.status(404).json({message:"Failed to add product"});
} else {

    res.status(200).json({
    message:"Product added successfully",
    product:addprod,
})
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}


// delete product

let deleteProduct=async(req,res)=>{
try {
    const id =req.params.id;
let delproduct = await Product.deleteOne({_id:id});
if (!delproduct) {
       res.status(404).json({message:"Failed to delete product"});
} else {

    res.status(200).json({
    message:"Product deleted successfully",
    products:delproduct,
})
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}


// edit product
 let editProduct=async(req,res)=>{

    const id =req.params.id;

try {
let updatedProduct = new Product({
    _id:id,
     title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        discountPercentage:req.body.discountPercentage,
        rating:req.body.rating,
        stock:req.body.stock,
        brand:req.body.brand,
        category:req.body.category,
        thumbnail:req.body.thumbnail,
        images:req.body.images

});
let editprod = await Product.updateOne({_id:id},updatedProduct);
if (!editprod) {
       res.status(404).json({message:"Failed to update product"});
} else {

    res.status(200).json({
    message:"Product updated successfully",
    product:editprod,
})
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
 }

// Get products by brand 
 let getProductsByBrand=async(req,res)=>{
    const brandName = (req.params.brand);
    // const brandName = (req.params.brand).toLowerCase();

try {
let products = await Product.find({brand:brandName});
if (products.length ==0) {
       res.status(404).json({message:"No products found"});
} else {

    res.status(200).json({
    message:`Our Products by ${brandName}`,
    products:products,
})
} 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}

 let addProductWithImage=async(req,res)=>{
   

try {
    let img=req.body.image;
cloudinary.config({ 
        cloud_name: 'dhpxsped3', 
        api_key: '861783791273133', 
        api_secret: '4Jjxm0kdtFXfB4mQJkBgsDkgq-w' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);  
    res.json({message:uploadResult}) 
} catch (error) {
   console.log(error) ;
   res.status(500).json({message:"Internal server errror"});
}
}








const controller = { getAllProducts, getProduct, addProduct,deleteProduct,addProductWithImage, editProduct, getProductsByBrand};
    // getProduct,addProduct,deleteProduct ,editProduct
    
export default controller;