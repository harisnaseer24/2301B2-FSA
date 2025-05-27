import express from 'express';
import {home,getProducts} from '../controllers/productController.mjs'

const router= express.Router();

router
.get("/",home)
.get("/products",getProducts)



export default router; 