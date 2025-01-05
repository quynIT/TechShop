import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, CreditCard, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
} from "../../redux/slides/orderSlide";
import { toast } from "react-toastify";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    _id: "",
  });
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("user_id"); // Get User ID from localStorage

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3001/api/user/get-details/${userId}`)
        .then((res) => res.json())
        .then((response) => {
          if (response && response.status === "OK" && response.data) {
            const userData = response.data; // Lấy dữ liệu thực từ API
            setUserDetails({
              name: userData.name || "",
              address: userData.address || "",
              city: userData.city || "",
              phone: userData.phone || "",
              email: userData.email || "",
              _id: userData._id || "",
            });
            console.log("Fetched data:", userData);
          } else {
            setError("No data received from API or invalid response format");
          }
        })
        .catch(() => {
          setError("Failed to fetch user details");
        });
    }
  }, [userId]);

  console.log("User Details:", userDetails);
  // Tăng số lượng sản phẩm
  const updateAmount = (product, newAmount) => {
    if (newAmount === 0) {
      // Nếu số lượng giảm xuống 0, xóa sản phẩm
      dispatch(removeOrderProduct({ idProduct: product }));
    } else if (newAmount > 0) {
      // Nếu số lượng > 0, tăng hoặc giảm số lượng
      if (newAmount > product.amount) {
        dispatch(increaseAmount({ idProduct: product.product }));
      } else {
        dispatch(decreaseAmount({ idProduct: product.product }));
      }
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (product) => {
    dispatch(removeOrderProduct({ idProduct: product.product }));
  };

  // Tính tổng tiền tạm tính
  const subtotal = order?.orderItems?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  // Phí vận chuyển (miễn phí)
  const shipping = 50;
  // Tổng cộng
  const total = subtotal + shipping;

  // Handle order creation
  const placeOrder = async () => {
    if (!userDetails) {
      toast.error("Vui lòng đăng nhập lại");
      return;
    }

    setIsLoading(true);

    const orderData = {
      orderItems: order?.orderItems.map((item) => ({
        product: item.product,
        name: item.name,
        price: item.price,
        amount: item.amount,
        image: item.image,
      })),
      shippingAddress: {
        fullName: userDetails?.name,
        address: userDetails?.address,
        city: "Chưa có thành phố",
        phone: userDetails?.phone,
      },
      paymentMethod: "Credit Card",
      city: "Chưa có thành phố",
      itemsPrice: subtotal,
      shippingPrice: shipping,
      totalPrice: total,
      user: userDetails?._id,
      isPaid: "pending",
      fullName: userDetails?.name,
      address: userDetails?.address,
      phone: userDetails?.phone,
      email: userDetails?.email,
    };

    if (!userId) {
      setIsLoading(false);
      toast.error("Vui lòng đăng nhập lại");
      return;
    }

    // Tạo một promise với timeout
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Yêu cầu quá thời gian"));
      }, 10000); // Timeout sau 10 giây
    });

    try {
      // Race giữa fetch request và timeout
      const response = await Promise.race([
        fetch(`http://localhost:3001/api/order/create/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }),
        timeoutPromise,
      ]);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Lỗi tạo đơn hàng");
      }

      // Chuyển trang ngay khi có response thành công
      navigate("/order-success", { state: { orderId: result._id } });
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error.message || "Không thể tạo đơn hàng");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-12 bg-white shadow-xl rounded-2xl min-h-screen">
      <h1 className="text-5xl font-bold mb-12">Your cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {order?.orderItems?.map((item) => {
            return (
              <div
                key={item.product}
                className="flex items-center border-b py-8"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-xl mr-8"
                />
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <p className="text-red-600 font-bold text-3xl mt-3">
                    {item.price.toLocaleString()}VND
                  </p>
                  <div className="flex items-center mt-6">
                    <button
                      onClick={() => updateAmount(item, item.amount - 1)}
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      <Minus size={24} />
                    </button>
                    <span className="mx-6 text-2xl">{item.amount}</span>
                    <button
                      onClick={() => updateAmount(item, item.amount + 1)}
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <Trash2 size={36} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-8">Total cart</h2>
            <div className="flex justify-between mb-6 text-xl">
              <span>Provisional:</span>
              <span>{subtotal?.toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between mb-6 text-xl">
              <span>Discount:</span>
              <span>0 VND</span>
            </div>
            <div className="flex justify-between mb-6 text-xl">
              <span>Shipping fee:</span>
              <span className="text-green-600 font-semibold">
                Free of charge
              </span>
            </div>
            <div className="flex justify-between font-semibold text-2xl border-t pt-6 mt-6">
              <span>Total:</span>
              <span className="text-red-600">
                {total?.toLocaleString()} VND
              </span>
            </div>
            <div className="flex justify-between font-semibold text-2xl border-t pt-6 mt-6">
              <span>Payment Method</span>
              <span className="text-red-600">PayPal</span>
            </div>
            <button
              onClick={placeOrder}
              className="w-full bg-red-600 text-white py-5 rounded-xl font-semibold text-2xl mt-8 hover:bg-red-700 transition duration-300"
            >
              Place order
            </button>
            <div className="mt-8 text-lg text-gray-600">
              <div className="flex items-center mb-4">
                <Truck className="w-8 h-8 mr-4" />
                <span>Free shipping nationwide</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 mr-4" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
