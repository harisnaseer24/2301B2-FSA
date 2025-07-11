import express from 'express';
import fs from  'node:fs';
import cors from 'cors';
// import 'dotenv/config'
import router from './routes/product.mjs';
import mongoose from 'mongoose';
// import methods from './test.mjs'
// import {add,sub} from './test.mjs'//named import
// methods.add();
// add();
// sub();
// console.log("This an example of server");
// const index=fs.readFileSync('index.html','utf-8');
// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// const products=data.products
// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// const index = fs.readFileSync("index.html","utf-8");
// let products= data.products;

// const productRouter= router;
// console.log(data);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/ecommerce");
console.log("db connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app = express()
const port = 3000;


// enable cors middleware
app.use(cors());

//body parser middleware
app.use(express.json());
// app.use(express.static('public'));

app.use('/',router)

// app.get('/products', (req, res) => {
// try{
//   res.json(products);
// }
// catch(e){
// console.log(e)
// }
// })

//request inputs

//route parameters
// app.get('/product/:id/', (req,res)=>{
// console.log(req.params.id);
// query parameters;//optional

// console.log(req.query.price)
// console.log(req.query.city)

// request body;
// console.log(req.body.name);
// console.log(req.body.email);
// const id =req.params.id;
// const product =products.find((prod)=>prod.id==id);
// if(!product){
//   return res.status(404).json({message:"Product not found"})
// }

// let newindex=index.replace('**img**',product.thumbnail)
// .replace('**title**',product.title)
// .replace('**description**',product.description)
// .replace('**price**',product.price)
// res.send(newindex);
// })

// app.get('/testing', (req, res) => {
//   res.send('This is our testing server!!!')
// })


// adding a new product
// app.post('/product',(req,res)=>{
//   console.log(req.body);
//   products= [...products,req.body];
//   res.json({"message":"Product added successfully",
//     "newProduct":req.body
//   })
// })

//updating a product
// task

//deleting a product
// task





// app.get('/*', (req, res) => {
//   res.status(404).json({errorMsg:'This is our testing server!!!'})
// })






app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
