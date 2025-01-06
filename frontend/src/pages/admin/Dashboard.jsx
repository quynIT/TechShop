import React, { useState, useEffect, useMemo } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
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
          // Filter only paid invoices
          const paidInvoices = result.data.filter(invoice => invoice.isPaid === "paid");
          setInvoices(paidInvoices);
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
    <>
      <div className="bg-gray-200 shadow-lg p-10">
        <div class="relative w-full text-gray-700 shadow-md  rounded-xl bg-white"></div>
        <div className="flex justify-between gap-16">
          <div class="p-10 w-full bg-white rounded-lg shadow-lg ">
            <div className="flex justify-between">
              <div>
                <h5 class="text-4xl font-semibold tracking-tight text-green dark:text-white">
                  Total Customers
                </h5>
                <p class="mt-5 text-3xl text-slate-700 ">10000000000$</p>
              </div>

              <svg
                class="w-24 h-24 rounded-full p-2 shadow-lg text-slate-500 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 13c0 2.038-2.239 4.5-5 4.5S7 15.038 7 13c0 1.444 10 1.444 10 0Z"
                />
                <path
                  fill="currentColor"
                  d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9 6.811.618 1.253 1.382.2-1 .975.236 1.377L9 9.966l-1.236.65L8 9.239l-1-.975 1.382-.2L9 6.811Zm6 0 .618 1.253 1.382.2-1 .975.236 1.377L15 9.966l-1.236.65L14 9.239l-1-.975 1.382-.2L15 6.811Z"
                />
              </svg>
            </div>
          </div>

          <div class="p-10 w-full bg-white rounded-lg shadow-lg ">
            <div className="flex justify-between">
              <div>
                <h5 class="text-4xl font-semibold tracking-tight text-green dark:text-white">
                  Total Revenue
                </h5>
                <p class="mt-5 text-3xl text-slate-700 ">10000000000$</p>
              </div>

              <svg
                class="w-24 h-24 text-cyan shadow-lg rounded-full p-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.6 16.733c.234.269.548.456.895.534a1.4 1.4 0 0 0 1.75-.762c.172-.615-.446-1.287-1.242-1.481-.796-.194-1.41-.861-1.241-1.481a1.4 1.4 0 0 1 1.75-.762c.343.077.654.26.888.524m-1.358 4.017v.617m0-5.939v.725M4 15v4m3-6v6M6 8.5 10.5 5 14 7.5 18 4m0 0h-3.5M18 4v3m2 8a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                />
              </svg>
            </div>
          </div>

          <div class="p-10 w-full bg-white rounded-lg shadow-lg ">
            <div className="flex justify-between">
              <div>
                <h5 class="text-4xl font-semibold tracking-tight text-green dark:text-white">
                  Total Orders
                </h5>
                <p class="mt-5 text-3xl text-slate-700 ">10000000000$</p>
              </div>

              <svg
                class="w-24 h-24 rounded-full shadow-lg text-leave p-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 6c0 1.657-3.134 3-7 3S5 7.657 5 6m14 0c0-1.657-3.134-3-7-3S5 4.343 5 6m14 0v6M5 6v6m0 0c0 1.657 3.134 3 7 3s7-1.343 7-3M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6"
                />
              </svg>
            </div>
          </div>

          <div class="p-10 w-full bg-white rounded-lg shadow-lg ">
            <div className="flex justify-between">
              <div>
                <h5 class="text-4xl font-semibold tracking-tight text-green dark:text-white">
                  Total Products
                </h5>
                <p class="mt-5 text-3xl text-slate-700 ">10000000000$</p>
              </div>

              <svg
                class="w-24 h-24 rounded-full shadow-lg p-4 text-green"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 min-h-screen top-0 left-0 w-full">
        <div className="p-10 bg-white">
          <div className="relative overflow-hidden text-gray-700 pb-6 bg-clip-border">
            <div className="flex items-center justify-between gap-8 mb-8">
              <div>
                <h5 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  Invoice List
                </h5>
                <p className="block mt-1 font-sans antialiased font-normal leading-relaxed text-3xl text-gray-700">
                  See information about all invoices
                </p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex justify-start gap-10 mb-6">
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
    </>
  );
};

export default Dashboard;