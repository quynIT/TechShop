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
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useDebounce } from "../../hooks/useDebounce";

const Homepage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 50);
  const [loading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [typeProduct, setTypeProduct] = useState([]);
  // State dùng cho chọn loại sản phẩm và load các sản phẩm theo loại đó
  const [selectedType, setSelectedType] = useState(null);

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    const type = context?.queryKey && context?.queryKey[3];
    const res = await ProductService.getAllProduct(search, limit, type);
    return res;
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
  };

  const {
    isPending,
    data: products,
    isPreviousData,
  } = useQuery({
    queryKey: ["products", limit, searchDebounce, selectedType],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setLimit(5); // Reset lại limit khi chọn type mới
  };

  return (
    <div style={{ width: "1270px", margin: "0 auto" }}>
      <WrapperTypeProduct>
        {typeProduct.map((item) => {
          return (
            <TypeProduct
              name={item}
              key={item}
              onClick={() => handleTypeClick(item)}
              isSelected={selectedType === item}
            />
          );
        })}
        {selectedType && (
          <div
            onClick={() => setSelectedType(null)}
            style={{
              marginLeft: "25px",
              color: "red",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Clear filter
          </div>
        )}
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
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <WrapperButtonMore
          textbutton={isPreviousData ? "Load more" : "Load more"}
          type="outline"
          styleButton={{
            border: `1px solid ${
              products?.total === products?.data?.length ? "#f5f5f5" : "#9255FD"
            }`,
            color: `${
              products?.total === products?.data?.length ? "#f5f5f5" : "#9255FD"
            }`,
            width: "240px",
            height: "38px",
            borderRadius: "4px",
          }}
          disabled={
            products?.total === products?.data?.length ||
            products?.totalPage === 1
          }
          styleTextButton={{
            fontWeight: 500,
            color: products?.total === products?.data?.length && "#fff",
          }}
          onClick={() => setLimit((prev) => prev + 6)}
        />
      </div>
      <TrendSlide />
    </div>
  );
};

export default Homepage;
