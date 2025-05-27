
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


//  let getProduct=async(req,res)=>{
// try {
//     let id=req.params.id;
// let product = await Product.find({_id:id});
// if (!product) {
//        res.status(404).json({message:"No products found"});
// } else {
//     res.status(200).json({
//     message:"Our Products",
//     product:product,
// })
// } 
// } catch (error) {
//    console.log(error) ;
//    res.status(500).json({message:"Internal server errror"});
// }
// }





//  let addProduct=async(req,res)=>{
// try {
//     let newProduct= new Product({
//         title:req.body.title,
//         description:req.body.description,
//         price:req.body.price,
//         discountPercentage:req.body.discountPercentage,
//         rating:req.body.rating,
//         stock:req.body.stock,
//         brand:req.body.brand,
//         category:req.body.category,
//         thumbnail:req.body.thumbnail,
//         images:req.body.images
//     })
// let product = await Product.insertOne(newProduct);

// if (!product) {
//        res.status(404).json({message:"Failed to add product"});
// } else {
//         console.log(product)
//     res.status(200).json({
//     message:"Product added successfully",
//     newProduct:product,
// })
// } 
// } catch (error) {
//    console.log(error) ;
//    res.status(500).json({message:"Internal server errror"});
// }
// }


//  let deleteProduct=async(req,res)=>{
// try {
//     const id = req.params.id;
//     let product = await Product.deleteOne({_id:id});


// if (!product) {
//        res.status(404).json({message:"Failed to delete product"});
// } else {
//         console.log(product)
//     res.status(200).json({
//     message:"Product deleted successfully",
//     deletedProduct:product,
// })
// } 
// } catch (error) {
//    console.log(error) ;
//    res.status(500).json({message:"Internal server errror"});
// }
// }

//  let editProduct=async(req,res)=>{
//     const id=req.params.id;
    
// try {
//     let editedProduct= new Product({
//         _id:id,
//         title:req.body.title,
//         description:req.body.description,
//         price:req.body.price,
//         discountPercentage:req.body.discountPercentage,
//         rating:req.body.rating,
//         stock:req.body.stock,
//         brand:req.body.brand,
//         category:req.body.category,
//         thumbnail:req.body.thumbnail,
//         images:req.body.images
//     })
// let product = await Product.updateOne({_id:id},editedProduct);

// if (!product) {
//        res.status(404).json({message:"Failed to update product"});
// } else {
//         console.log(product)
//     res.status(200).json({
//     message:"Product updated successfully",
//     editedProduct:product,
// })
// } 
// } catch (error) {
//    console.log(error) ;
//    res.status(500).json({message:"Internal server errror"});
// }
// }








const controller = { getAllProducts, getProduct, addProduct,deleteProduct};
    // getProduct,addProduct,deleteProduct ,editProduct
    
export default controller;