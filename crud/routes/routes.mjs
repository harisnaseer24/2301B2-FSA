import express from 'express';
import controller from '../controllers/productController.mjs';
import userController from '../controllers/userController.mjs';

const router= express.Router();

router
.get("/",controller.getAllProducts)
.get("/product/:id",controller.getProduct)
.get("/products/:brand",controller.getProductsByBrand)
.post("/addproduct",controller.addProduct)
.delete("/deleteproduct/:id",controller.deleteProduct)
.put("/editproduct/:id",controller.editProduct)

//user routes
.post("/user/register",userController.registerUser)
.post("/user/login",userController.loginUser)
.patch("/user/deactivateUser/:userId/:status",userController.changeActivationStatus)
.patch("/user/activateUser/:userId/:status",userController.changeActivationStatus)



export default router; 