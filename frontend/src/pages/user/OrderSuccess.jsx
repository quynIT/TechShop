import React, { useEffect, useState } from "react";
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clearCart } from "../../redux/slides/orderSlide";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({});
  const [paypalClientId, setPaypalClientId] = useState(""); // Lưu trữ client-id PayPal

  // Lấy client-id PayPal từ API
  useEffect(() => {
    const fetchPayPalClientId = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/payment/config"
        );
        const data = await response.json();
        if (data.status === "OK") {
          setPaypalClientId(data.data); // Lưu client-id PayPal vào state
        }
      } catch (error) {
        console.error("Error fetching PayPal client-id:", error);
      }
    };

    fetchPayPalClientId();
  }, []);

  // Cập nhật thông tin đơn hàng nếu cần (giả sử orderId và các thông tin khác)
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/order/get-details-order/${orderId}`
        );
        const data = await response.json();
        if (data.status === "OK") {
          setOrderDetails(data.data); // Cập nhật thông tin đơn hàng vào state
        } else {
          console.error("Failed to fetch order details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  // Hàm xử lý khi thanh toán thành công
  const handlePaymentSuccess = async (details, data) => {
    alert("Transaction completed by " + details.payer.name.given_name);

    // Gửi yêu cầu lên server để cập nhật trạng thái đơn hàng
    try {
      const response = await fetch(
        `http://localhost:3001/api/order/update-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isPaid: "paid", // Cập nhật trạng thái thanh toán thành 'paid'
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Order status updated successfully");

        // Điều hướng tới trang lịch sử đơn hàng
        navigate("/order-history");
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error while updating order status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-14 rounded-xl shadow-lg max-w-4xl w-full">
        <div className="text-center mb-12">
          <CheckCircle className="mx-auto h-28 w-28 text-green-500 mb-8" />
          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Order successful!
          </h2>
          <p className="text-2xl text-gray-600">
            Thank you for ordering at TechShop
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-10 mb-10">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-xl font-medium text-gray-600">Code:</span>
              <span className="text-xl font-semibold text-gray-800 ml-2">
                #{orderId}
              </span>
            </div>
            <div>
              <span className="text-xl font-medium text-gray-600">Total:</span>
              <span className="text-xl font-semibold text-gray-800 ml-2">
                {orderDetails.totalPrice} VND
              </span>
            </div>
            <div>
              <span className="text-xl font-medium text-gray-600">Status:</span>
              <span className="text-xl font-semibold text-gray-800 ml-2">
                {orderDetails.isPaid}
              </span>
            </div>
            <div>
              <span className="text-xl font-medium text-gray-600">
                CreatedAt:
              </span>
              <span className="text-xl font-semibold text-gray-800 ml-2">
                {orderDetails.createdAt
                  ? new Date(orderDetails.createdAt).toLocaleDateString("vi-VN")
                  : "Loading..."}
              </span>
            </div>
            <div>
              <span className="text-xl font-medium text-gray-600">
                Payment method:
              </span>
              <span className="text-xl font-semibold text-gray-800 ml-2">
                Credit card
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-12">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">
              Order Status
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Package className="h-10 w-10 text-blue-500 mr-5" />
                <span className="text-xl text-gray-700">
                  Order is being processed
                </span>
              </div>
              <div className="flex items-center">
                <Truck className="h-10 w-10 text-blue-500 mr-5" />
                <span className="text-xl text-gray-700">
                  Estimated delivery in 2-3 days
                </span>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-green-700 mb-6">
              Payment information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <CreditCard className="h-10 w-10 text-green-500 mr-5" />
                <span className="text-xl text-gray-700">Paid in full</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-10 w-10 text-green-500 mr-5" />
                <span className="text-xl text-gray-700">
                  Transaction successful
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Nút PayPal */}
        {paypalClientId && (
          <PayPalButton
            amount={orderDetails.totalPrice} // Sử dụng tổng giá trị thực tế của đơn hàng
            onSuccess={handlePaymentSuccess} // Gọi hàm cập nhật trạng thái khi thanh toán thành công
            onError={(err) => {
              console.error("Error in PayPal payment:", err);
              alert("Error processing payment.");
            }}
            onCancel={() => {
              alert("Payment was cancelled.");
            }}
            options={{
              clientId: paypalClientId, // Sử dụng client-id lấy từ API
            }}
          />
        )}

        <Link
          to="/order-history"
          className="w-full bg-blue-600 text-white py-5 px-6 rounded-lg text-2xl font-semibold hover:bg-blue-700 transition duration-300 text-center inline-block"
        >
          Order Tracking
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
