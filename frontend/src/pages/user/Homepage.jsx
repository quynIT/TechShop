import React from "react";
import {
  WrapperProducts,
  WrapperTypeProduct,
} from "../../components/HomePage/style";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import SlideComponent from "../../components/SlideComponent/SlideComponent";
import banner_1 from "../../assets/image/Banner_1.jpg";
import banner2 from "../../assets/image/Banner2.jpg";
import banner3 from "../../assets/image/Banner3.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";
import TrendSlide from "../../components/TrendSlide/TrendSlide";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../services/ProductService'

const Homepage = () => {
  const arr = ["TV", "Tủ Lạnh", "Laptop", "Điện Thoại"];
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res', res)
    return res
  }

  const { isPending, data: products } = useQuery({ queryKey: 'products', queryFn: fetchProductAll, retry: 3, retryDelay: 1000 })
  console.log('data', products)
  return (
    <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
        <TypeProduct />
      </WrapperTypeProduct>
      <SlideComponent arrImages={[banner_1, banner2, banner3]} />
      <WrapperProducts>
        {products?.data?.map((product) => {
          return (
            <Link to="/detail">
              <CardComponent 
              key={product._id} 
              countInStock={product.countInStock} 
              description={product.description}
              image={product.image} 
              name={product.name}
              price={product.price}
              rating={product.rating}
              type={product.type}
              selled={product.selled}
              discount={product.discount}
              />
            </Link>
          )
        })}
      </WrapperProducts>
      <TrendSlide />
    </div>
  );
};

export default Homepage;
