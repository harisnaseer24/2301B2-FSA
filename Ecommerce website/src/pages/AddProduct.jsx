import axios from 'axios';
import React, { useState } from 'react';

const AddProduct = () => {
  const addProduct = async (e) => {
    e.preventDefault(); 

    const title = document.getElementById("title").value;
    const description = document.getElementById("desc").value;
    const price = document.getElementById("price").value;
    const discountPercentage = document.getElementById("disc").value;
    const brand = document.getElementById("brand").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const rating = document.getElementById("rating").value;
    const images = document.getElementById("images").value;

    if (title === "" || description === "" || price === "") {
      alert("Please fill all fields");
    } else {
      try {
        const response = await axios.post("http://localhost:3000/addproduct", {
          title,
          description,
          price,
          discountPercentage,
          brand,
          stock,
          category,
          thumbnail,
          rating,
          images,
        });

        console.log(response.data); // Full response from server
        alert("Product added successfully!");

      } catch (error) {
        console.error("Failed to add product:", error);
        alert("Failed to add product");
      }
    }
  };

  return (
    <div className='container my-4'>
      <h1>Adding Product</h1>
      <form>
        <input type="text" className='form-control my-2' id="title" placeholder="Enter title" />
        <input type="text" className='form-control my-2' id="desc" placeholder="Enter description" />
        <input type="number" className='form-control my-2' id="price" placeholder="Enter price" />
        <input type="number" className='form-control my-2' id="rating" placeholder="Enter rating" />
        <input type="number" className='form-control my-2' id="disc" placeholder="Enter discount percentage" />
        <input type="number" className='form-control my-2' id="stock" placeholder="Enter stock" />
        <input type="text" className='form-control my-2' id="category" placeholder="Enter category" />
        <input type="text" className='form-control my-2' id="brand" placeholder="Enter brand" />
        <input type="text" className='form-control my-2' id="thumbnail" placeholder="Enter thumbnail URL" />
        <input type="text" className='form-control my-2' id="images" placeholder="Enter image URL(s)" />

        <button className='btn btn-danger' onClick={addProduct}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
