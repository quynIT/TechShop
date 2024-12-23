import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";

export default function Staffpage() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    orderItems: [
      {
        name: "Mouse",
        amount: 3,
        image: "",
        price: 50,
        discount: 0,
        product: "6764f285f4df6249df7a47b0",
      },
    ],
    shippingAddress: {
      fullName: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "USA",
      phone: 1234567890,
    },
    paymentMethod: "Credit Card",
    city: "helooooo",
    itemsPrice: 1700,
    shippingPrice: 50,
    taxPrice: 150,
    totalPrice: 190000000000000,
    user: "67679bcef2dbc4b312a7b21b",
    isPaid: "pending",
    paidAt: "",
    isDelivered: false,
    fullName: "John Doe",
    address: "123 Main St",
    deliveredAt: null,
    phone: 1234567890,
    email: "trungquyen29022003@gmail.com",
  });

  // Handle modal open/close
  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  return (
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
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4 border-b border-slate-200 py-5">
                  <img
                    src="https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/michael-oxendine-GHCVUtBECuY-unsplash.jpg"
                    alt="Product 3"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  John Doe
                </th>
                <td className="px-6 py-4">123-456-7890</td>
                <td className="px-6 py-4">$1999</td>
                <td className="px-6 py-4">
                  <span className="px-4 py-2 text-white bg-green-500 rounded-full">
                    Processing
                  </span>
                </td>
                <td className="px-6 py-4 flex space-x-3">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit className="w-6 h-6" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrashAlt className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for editing invoice */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">Edit Invoice</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={invoiceData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={invoiceData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={invoiceData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
