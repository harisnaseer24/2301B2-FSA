import express from 'express';
import fs from  'node:fs';
import cors from 'cors';
// import methods from './test.mjs'
// import {add,sub} from './test.mjs'//named import

// methods.add();

// add();
// sub();
console.log("This an example of server");
// const index=fs.readFileSync('index.html','utf-8');
// const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
// const products=data.products

const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
const products= data.products;
// console.log(data);

const app = express()
const port = 3000

// enable cors
app.use(cors());

app.get('/', (req, res) => {
  // res.json(products); 
  res.send("hello world")
})

app.get('/products', (req, res) => {
  res.json(products); 
})

app.get('/product/:id', (req,res)=>{
// console.log(req.params.id);
const id =req.params.id;
const product =products.find((prod)=>prod.id==id);
if(!product){
  return res.status(404).json({message:"Product not found"})
}
res.json(product);
})

app.get('/testing', (req, res) => {
  res.send('This is our testing server!!!')
})

// app.get('/*', (req, res) => {
//   res.status(404).json({errorMsg:'This is our testing server!!!'})
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
