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

const Homepage = () => {
  const arr = ["TV", "Tủ Lạnh", "Laptop", "Điện Thoại"];
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
        <Link to="/detail">
          <CardComponent />
        </Link>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </WrapperProducts>
      <TrendSlide />
    </div>
  );
};

export default Homepage;
