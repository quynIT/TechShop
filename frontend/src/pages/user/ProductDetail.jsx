import React from "react";
import { Star, ShoppingCart, Truck, Shield } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addOrderProduct } from "../../redux/slides/orderSlide";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  // Tìm nạp chi tiết sản phẩm bằng id
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", id],
    queryFn: fetchGetDetailsProduct,
    enabled: !!id,
  });

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItems: {
            name: productDetails?.name,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };

  return (
    <Loading isPending={isPending}>
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 m-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Phần hình ảnh sản phẩm */}
          <div className="space-y-6 ">
            <div className="aspect-w-4 aspect-h-3 bg-white rounded-xl overflow-hidden shadow-lg">
              <img
                src={productDetails?.image}
                alt={productDetails?.name}
                className="w-full h-[300px] object-contain object-center border rounded-md shadow-md"
              />
            </div>
          </div>

          {/* Phần thông tin sản phẩm */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">
              {productDetails?.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(productDetails?.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                  />
                ))}
                <span className="ml-2 text-lg font-medium text-gray-600">
                  {productDetails?.rating}
                </span>
              </div>
              <span className="text-lg text-blue-600 hover:underline cursor-pointer">
                {productDetails?.countInStock} in stock
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-lg">{productDetails?.description}</span>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-bold text-red-600">
                {productDetails?.price.toLocaleString()}₫
              </span>
            </div>

            {/* Nút mua hàng */}
            <button
              className="w-full bg-red-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-red-700 transition duration-300 shadow-md"
              onClick={handleAddOrderProduct}
            >
              BUY NOW
            </button>

            {/* Thông tin thêm */}
            <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
              <div className="flex items-center">
                <Truck className="w-6 h-6 mr-3 text-green-500" />
                <span className="text-lg">Free shipping nationwide</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-6 h-6 mr-3 text-blue-500" />
                <span className="text-lg">12 month genuine warranty</span>
              </div>
              <div className="flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-orange-500" />
                <span className="text-lg">0% interest installment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default ProductDetail;
