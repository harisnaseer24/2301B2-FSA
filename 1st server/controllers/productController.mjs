import fs from  'node:fs';
const data = JSON.parse(fs.readFileSync("data.json","utf-8"));
let products= data.products;

export const home=(req,res)=>{
res.send("hello world")
}

export const getProducts=(req,res)=>{

res.json(products);
}


