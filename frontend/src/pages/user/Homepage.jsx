import React, { useEffect, useRef, useState } from "react";
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
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const Homepage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 1000)
  const refSearch = useRef()
  const [loading, setLoading] = useState(false)
  const [stateProduct, setStateProduct] = useState([])
  const arr = ["TV", "Fridge", "Laptop", "Phone"];
  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search);
    if (search?.length > 0 || refSearch.current) {
      setStateProduct(res?.data)
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      setLoading(true)
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
    setLoading(false)
  }, [searchDebounce])

  const { isPending, data: products } = useQuery({
    queryKey: "products",
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProduct(products?.data)
    }
  }, [products])

  return (
    <Loading isPending={isPending || loading}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
          })}
          <TypeProduct />
        </WrapperTypeProduct>
        <SlideComponent arrImages={[banner_1, banner2, banner3]} />
        <WrapperProducts>
          {stateProduct?.map((product) => {
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
            );
          })}
        </WrapperProducts>
        <TrendSlide />
      </div>
    </Loading>
  );
};

export default Homepage;