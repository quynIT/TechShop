import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Staffpage() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state để lưu giá trị tìm kiếm
  const navigate = useNavigate();

  // Fetch all orders initially
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/order/get-all-order"
        );
        const result = await response.json();
        if (result.status === "OK") {
          setInvoices(result.data);
        } else {
          console.error("API error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Search orders by name
  const handleSearch = async (name) => {
    if (!name) {
      // Nếu không có từ khóa tìm kiếm, hiển thị lại toàn bộ đơn hàng
      try {
        const response = await fetch(
          "http://localhost:3001/api/order/get-all-order"
        );
        const result = await response.json();
        if (result.status === "OK") {
          setInvoices(result.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/order/search?name=${name}`
      );
      const result = await response.json();
      if (result.status === "OK") {
        setInvoices(result.data);
      } else {
        console.error("API error:", result.message);
      }
    } catch (error) {
      console.error("Error searching orders:", error);
    }
  };

  // Handle delete order
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/order/cancel-order/${orderId}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result.status === "OK") {
        setInvoices((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice._id !== orderId)
        );
        alert("Order canceled successfully!");
      } else {
        console.error("Failed to delete order:", result.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="p-10 min-h-screen top-0 left-0 w-full">
      <div className="p-10 bg-white">
        <div className="flex justify-center items-center border border-blue-400 p-6 h-24 mb-5">
          <h1 className="text-blue-700 font-bold uppercase text-2xl">
            Manage employee invoices
          </h1>
        </div>
        <div className="flex justify-center items-center mb-5 px-6">
          <div className="relative w-2/3">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value); // Gọi hàm tìm kiếm mỗi khi nhập
              }}
              className="w-full h-12 px-12 py-2 border border-blue-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-blue-400 border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-2xl text-slate-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Invoice Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-2xl font-bold">
                    {invoice.shippingAddress.fullName}
                  </td>
                  <td className="px-6 py-4 text-2xl font-bold">
                    {invoice.shippingAddress.phone}
                  </td>
                  <td className="px-6 py-4 text-2xl font-bold">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-2xl font-bold">
                    ${invoice.totalPrice}
                  </td>
                  <td className="px-6 py-4 text-2xl font-bold">
                    <span
                      className={`px-4 py-2 text-2xl font-bold text-white rounded-full ${
                        invoice.isPaid === "paid"
                          ? "bg-emerald-500"
                          : invoice.isPaid === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {invoice.isPaid === "paid"
                        ? "Paid"
                        : invoice.isPaid === "pending"
                        ? "Pending"
                        : "Cancel"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-3">
                    <button
                      onClick={() => navigate(`/staff/view/${invoice._id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => navigate(`/staff/edit/${invoice._id}`)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <FaEdit className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => handleDelete(invoice._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
