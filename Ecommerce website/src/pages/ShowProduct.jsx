import React from 'react'
import axios from "axios"
import { useState,useEffect } from "react";

const ShowProduct = () => {
    const [myproducts, setProducts] = useState([]);
const getProducts=()=>{
try {

  axios.get("http://localhost:3000/")
  .then((resp)=>{
console.log(resp.data.products);
setProducts([...resp.data.products])
  });

  
} catch (error) {
  console.log(error)
}
}
// delete product;
const deleteProduct=async (pid)=>{
    let confirmation= confirm("Are u sure?");
    console.log(confirmation);
    console.log(pid);

    if(confirmation){
let deleteProd= await axios.delete(`http://localhost:3000/deleteproduct/${pid}`);
if(deleteProd.status == 200){
    alert(deleteProd.data.message)
    getProducts();
    
}else{
    alert(deleteProd.data.message)
}}

}
useEffect(()=>{
  getProducts();
},[])
  return (
   <>
   <div className="container table-responsive"> 
  <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Image</th>
      <th scope="col">Price</th>
      <th scope="col">Stock</th>
      <th scope="col">Rating</th>
      <th scope="col">Brand</th>
      <th scope="col">Category</th>
      <th scope="col">Discount %</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>


    {

        myproducts.length >0 ? 
        myproducts.map((item,index)=>{
            return (
                <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.thumnail}</td>
      <td>{item.price}</td>
      <td>{item.stock}</td>
      <td>{item.rating}</td>
      <td>{item.brand}</td>
      <td>{item.category}</td>
      <td>{item.discountPercentage}</td>
      <td>
        <button >Edit</button>
        <button onClick={()=>{deleteProduct(item._id)}}>Delete</button>
      </td>
     
    </tr>
            )
        })
        
        : <tr>No product found</tr>
    }
    
  </tbody>
</table>

   </div>
   </>
  )
}

export default ShowProduct
