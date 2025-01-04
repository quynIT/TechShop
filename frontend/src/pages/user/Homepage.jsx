import React, { useEffect, useState } from "react";
import {
  WrapperButtonMore,
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
  const searchDebounce = useDebounce(searchProduct, 500)
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(5)
  const arr = ["TV", "Fridge", "Laptop", "Phone"];

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit);
    return res;
  };

  const { isPending, data: products, isPreviousData } = useQuery({
    queryKey: ["products", limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true
  });

  return (
    <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperTypeProduct>
        {arr.map((item) => {
          return <TypeProduct name={item} key={item} />;
        })}
        <TypeProduct />
      </WrapperTypeProduct>
      <SlideComponent arrImages={[banner_1, banner2, banner3]} />
      <Loading isPending={isPending || loading}>
        <WrapperProducts>
          {products?.data?.map((product) => {
            return (

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
                id={product._id}
              />

            );
          })}
        </WrapperProducts>
      </Loading>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <WrapperButtonMore
          textbutton={isPreviousData ? 'Load more' : "Load more"} type="outline" styleButton={{
            border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`, color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#9255FD'}`,
            width: '240px', height: '38px', borderRadius: '4px'
          }}
          disabled={products?.total === products?.data?.length || products?.totalPage === 1}
          styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
          onClick={() => setLimit((prev) => prev + 6)}
        />
      </div>
      <TrendSlide />
    </div >
  );
};

export default Homepage;