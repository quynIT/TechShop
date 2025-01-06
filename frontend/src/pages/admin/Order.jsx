import React, { useState, useEffect, useMemo } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 6;

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3001/api/order/get-all-order"
        );
        const result = await response.json();
        if (result.status === "OK") {
          setInvoices(result.data);
          setError(null);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Error fetching orders");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
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

  // Filtered and Processed Invoices
  const processedInvoices = useMemo(() => {
    return invoices
      .filter((invoice) => {
        // Search filter
        const matchesSearch =
          invoice.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.shippingAddress.phone.includes(searchTerm);

        // Status filter
        const matchesStatus =
          statusFilter === "all" ||
          invoice.isPaid === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by most recent
  }, [invoices, searchTerm, statusFilter]);

  // Pagination Calculations
  const totalPages = Math.ceil(processedInvoices.length / itemsPerPage);

  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return processedInvoices.slice(startIndex, endIndex);
  }, [processedInvoices, currentPage]);

  // Pagination Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render Pagination Buttons
  const renderPaginationButtons = () => {
    const buttons = [];

    // Previous Button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 min-w-9 min-h-9 text-3xl font-normal ${currentPage === 1
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-500 hover:bg-slate-50 hover:border-slate-400'
          } bg-white border border-slate-200 rounded transition duration-200 ease`}
      >
        Prev
      </button>
    );

    // Page Number Buttons
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 min-w-9 min-h-9 text-3xl font-normal ${currentPage === i
              ? 'text-white bg-slate-800 border-slate-800'
              : 'text-slate-500 bg-white border-slate-200 hover:bg-slate-50'
            } border rounded hover:border-slate-400 transition duration-200 ease`}
        >
          {i}
        </button>
      );
    }

    // Next Button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 min-w-9 min-h-9 text-3xl font-normal ${currentPage === totalPages
            ? 'text-slate-300 cursor-not-allowed'
            : 'text-slate-500 hover:bg-slate-50 hover:border-slate-400'
          } bg-white border border-slate-200 rounded transition duration-200 ease`}
      >
        Next
      </button>
    );

    return buttons;
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

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

          {/* Filters and Search */}
          <div className="flex justify-start gap-10 mb-6">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-transparent shadow-md text-slate-700 text-3xl border border-slate-300 rounded px-5 pr-8 py-4 transition duration-300 ease focus:outline-none hover:border-green"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancel">Canceled</option>
              </select>
            </div>

            {/* Search Input */}
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute w-10 h-10 top-5 left-5 text-slate-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 px-3 py-4 bg-transparent shadow-md shadow-green/30 
      placeholder:text-slate-700 text-slate-600 md:text-3xl 
      border border-slate-200 rounded-md 
      transition duration-300 ease 
      focus:outline-none focus:border-cyan 
      hover:border-green focus:shadow"
              />
            </div>
          </div>
        </div>

        {/* Loading and Error States */}
        {loading ? (
          <div className="text-center text-4xl py-10 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-2xl text-slate-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Customer Name</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Invoice Date</th>
                  <th scope="col" className="px-6 py-3">Total Price</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Action</th>

                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((invoice) => (
                    <tr key={invoice._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="px-6 py-4 text-2xl font-bold">{invoice.shippingAddress.fullName}</td>
                      <td className="px-6 py-4 text-2xl font-bold">{invoice.shippingAddress.phone}</td>
                      <td className="px-6 py-4 text-2xl font-bold">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-2xl font-bold">${invoice.totalPrice}</td>
                      <td className="px-6 py-4 text-2xl font-bold">
                        <span className={`px-4 py-2 text-2xl font-bold text-white rounded-full ${invoice.isPaid === "paid" ? "bg-emerald-500" : invoice.isPaid === "pending" ? "bg-yellow-500" : "bg-red-500"}`}>
                          {invoice.isPaid === "paid" ? "Paid" : invoice.isPaid === "pending" ? "Pending" : "Canceled"}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex space-x-3">
                        <button onClick={() => navigate(`/admin/viewOrder/${invoice._id}`)} className="text-blue-500 hover:text-blue-700">
                          <FaEye className="w-6 h-6" />
                        </button>
                        <button onClick={() => navigate(`/admin/edit/${invoice._id}`)} className="text-yellow-500 hover:text-yellow-700">
                          <FaEdit className="w-6 h-6" />
                        </button>
                        <button onClick={() => handleDelete(invoice._id)} className="text-red-500 hover:text-red-700">
                          <FaTrashAlt className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-4xl p-10 text-gray-500">No invoices found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-end p-4 border-t border-blue-gray-50">
          <div className="flex space-x-1">
            {renderPaginationButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;