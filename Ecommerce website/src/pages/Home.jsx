// src/pages/Home.jsx
import React from 'react';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import BestSelling from '../components/BestSelling';
import Products from '../components/Products';
import Footer from '../components/Footer';
import axios from "axios"
import { useState } from "react";

const Home = () => {
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

useEffect(()=>{
  getProducts();
},[])


  return (
    <div>
      <Banner />
      <Categories />
      <BestSelling />
      <Products products={myproducts}/>
      <Footer/>
    </div>
  );
};

export default Home;
