import express from 'express';
import controller from '../controllers/productController.mjs';
import userController from '../controllers/userController.mjs';
import { upload } from '../cloudinaryConfig.mjs';

const router= express.Router();

router
.get("/",userController.auth,controller.getAllProducts)
.get("/product/:id",controller.getProduct)
.get("/products/:brand",controller.getProductsByBrand)
.post("/addproduct",controller.addProduct)
.post("/addproductwithimage",upload.single('image'),controller.addProductWithImage)
.delete("/deleteproduct/:id",controller.deleteProduct)
.put("/editproduct/:id",controller.editProduct)

//user routes
.get("/user/send-verification-email",userController.sendEmail)

.post("/user/register",userController.registerUser)
.post("/user/login",userController.loginUser)
.patch("/user/deactivateUser/:userId/:status",userController.changeActivationStatus)
.patch("/user/activateUser/:userId/:status",userController.changeActivationStatus)



export default router; 