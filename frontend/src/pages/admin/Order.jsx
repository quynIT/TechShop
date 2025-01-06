import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Order = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/order/get-all-order"
        );
        const result = await response.json();
        if (result.status === "OK") {
          setInvoices(result.data); // Cập nhật trạng thái với `data`
        } else {
          console.error("API error:", result.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Handle delete order
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/order/cancel-order/${orderId}`,
        {
          method: "DELETE", // Assuming DELETE method for canceling order
        }
      );
      const result = await response.json();
      if (result.status === "OK") {
        // If delete was successful, remove order from state
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
    <div className=" min-h-screen top-0 left-0 w-full">
      <div className="p-10 bg-white">
        <div className="relative overflow-hidden text-gray-700 pb-6 bg-clip-border">
          <div className="flex items-center justify-between gap-8 mb-8">
            <div>
              <h5 className="block font-sans text-5xl antialiased font-bold text-green leading-snug tracking-normal text-blue-gray-900">
                Invoice List
              </h5>
              <p className="block mt-1 font-sans antialiased font-normal leading-relaxed text-3xl text-gray-700">
                See information about all invoices
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-3xl text-left border border-slate-200 rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-3xl text-slate-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  <td className="px-6 py-8 text-3xl font-semibold">
                    {invoice.shippingAddress.fullName}
                  </td>
                  <td className="px-6 py-4 text-3xl ">
                    {invoice.shippingAddress.phone}
                  </td>
                  <td className="px-6 py-4 text-3xl ">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-3xl ">
                    ${invoice.totalPrice}
                  </td>
                  <td className="px-6 py-4 text-3xl ">
                    <span
                      className={`px-4 py-2 text-3xl font-bold text-white rounded-full ${
                        invoice.isPaid === "paid"
                          ? "bg-leave"
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
                  <td className="px-6 py-8 flex space-x-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/viewOrder/${invoice._id}`)
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEye className="w-10 h-10" />
                    </button>
                    <button
                      onClick={() => navigate(`/admin/edit/${invoice._id}`)}
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <FaEdit className="w-10 h-10" />
                    </button>
                    <button
                      onClick={() => handleDelete(invoice._id)} // Gọi hàm handleDelete khi nhấn thùng rác
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt className="w-10 h-10" />
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
};

export default Order;
