import express from 'express';
import controller from '../controllers/productController.mjs';

const router= express.Router();

router
.get("/",controller.getAllProducts)
.get("/product/:id",controller.getProduct)
.post("/addproduct",controller.addProduct)
.delete("/deleteproduct/:id",controller.deleteProduct)


// .get("/product/:id",controller.getProduct)
// .post("/addproduct",controller.addProduct)
// .delete("/deleteproduct/:id",controller.deleteProduct)
// .put("/editproduct/:id",controller.editProduct)

export default router; 