import React, { useState, useEffect } from "react";
import { FaReceipt } from "react-icons/fa";

const InvoiceCard = ({ invoice, onStatusUpdate }) => {
  // Hàm xử lý khi bấm nút hủy
  const handleCancelOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/order/update-status/${invoice._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPaid: "cancel" }),
        }
      );
      const data = await response.json();
      if (data.status === "OK") {
        alert("Hủy đơn hàng thành công");
        // Cập nhật trạng thái sau khi hủy mà không reload trang
        onStatusUpdate(invoice._id, "cancel");
      } else {
        alert("Không thể hủy đơn hàng.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Đã xảy ra lỗi khi hủy đơn hàng.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full max-w-2xl h-full">
      <h2 className="text-lg font-bold text-orange-500 flex items-center gap-2">
        <FaReceipt />
        HÓA ĐƠN MUA HÀNG
      </h2>
      <p className="text-sm text-gray-600 mt-2">
        Cảm ơn quý khách đã mua hàng tại Tech Shop
      </p>

      <div className="mt-4">
        <h3 className="font-bold text-4xl mb-2">Thông tin giao hàng:</h3>
        <p className="text-2xl">Họ tên: {invoice.shippingAddress.fullName}</p>
        <p className="text-2xl">Địa chỉ: {invoice.shippingAddress.address}</p>
        <p className="text-2xl">Thành phố: {invoice.shippingAddress.city}</p>
        <p className="text-2xl">
          Số điện thoại: {invoice.shippingAddress.phone}
        </p>
      </div>

      <table className="w-full text-left text-sm mt-4">
        <thead>
          <tr className="border-b">
            <th className="pb-2 text-xl">Tên sản phẩm</th>
            <th className="pb-2 text-xl">Số lượng</th>
            <th className="pb-2 text-xl">Giá (VND)</th>
            <th className="pb-2 text-xl">Tổng giá (VND)</th>
          </tr>
        </thead>
        <tbody>
          {invoice.orderItems.map((product, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-orange-100" : ""}>
              <td className="py-2 text-xl">{product.name}</td>
              <td className="py-2 text-center text-xl">{product.amount}</td>
              <td className="py-2 text-center text-xl">{product.price} VND</td>
              <td className="py-2 text-center text-xl">
                {product.amount * product.price} VND
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-lg font-bold text-right text-orange-500">
        Tổng tiền phải thanh toán: {invoice.totalPrice} VND
      </p>

      <p className="mt-2 text-xs text-gray-500 text-center">
        Phương thức thanh toán: {invoice.paymentMethod}
      </p>

      {/* Nút hành động */}
      <div className="mt-4 flex justify-center items-center">
        {/* Hiển thị trạng thái dựa trên giá trị isPaid */}
        {invoice.isPaid === "pending" && (
          <button className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded-lg mr-20">
            Wait for Payment
          </button>
        )}
        {invoice.isPaid === "paid" && (
          <span className="text-green-500 text-lg font-bold">
            Waiting for delivery
          </span>
        )}
        {invoice.isPaid === "cancel" && (
          <span className="text-red-500 text-lg font-bold">
            Order Cancelled
          </span>
        )}

        {/* Nút Hủy đơn (chỉ hiện khi trạng thái là pending) */}
        {invoice.isPaid === "pending" && (
          <button
            onClick={handleCancelOrder}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Hủy đơn
          </button>
        )}
      </div>
    </div>
  );
};

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve the userId from localStorage
  const userId = localStorage.getItem("user_id");

  // Hàm cập nhật trạng thái đơn hàng sau khi hủy
  const handleStatusUpdate = (id, status) => {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) =>
        invoice._id === id ? { ...invoice, isPaid: status } : invoice
      )
    );
  };

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in localStorage");
      setLoading(false);
      return;
    }

    const fetchInvoices = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/order/get-all-order/${userId}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          setInvoices(data.data);
        } else {
          setError("No invoices found");
        }
      } catch (error) {
        setError("Failed to load invoices");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Danh sách hóa đơn
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice._id}
              invoice={invoice}
              onStatusUpdate={handleStatusUpdate} // Truyền callback để cập nhật trạng thái
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
