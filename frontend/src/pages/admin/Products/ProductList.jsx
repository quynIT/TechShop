import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ProductService from '../../../services/ProductService'
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Modal from '../../../components/ModalComponent/ModalComponent'; // Import the Modal component
import { message } from "antd";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import { useSelector } from "react-redux";

const ProductList = () => {
  // Get the product ID from the URL
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const user = useSelector((state) => state?.user);

  const mutationDelete = useMutationHooks(
    (data) => {
      const { id, token } = data;
      const res = ProductService.deleteProduct(id, token);
      return res;
    }
  );

  const { isSuccess: isSuccessDeleted, isError: isErrorDeleted, data: dataDeleted } = mutationDelete;

  const { isLoading, data: products, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        const res = await ProductService.getAllProduct();
        if (res?.data) {
          return res.data;
        }
        throw new Error("No data received from server");
      } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
      }
    },
  });

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success("Xóa sản phẩm thành công!");
      refetch(); // Reload the product list after deletion
    } else if (isErrorDeleted) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  }, [isSuccessDeleted, refetch]); // Ensure refetch is in dependencies

  // Function to handle delete confirmation
  const handleDeleteConfirm = async () => {
    mutationDelete.mutate({ id: productToDelete._id, token: user?.access_token });
    setIsModalOpen(false); // Close the modal after confirming deletion
  };

  // Function to handle opening the modal with the product to delete
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  return (
    <div className="p-10 absolute top-0 left-0 w-full">
      <div className="p-10 bg-white">
        <div className="relative overflow-hidden text-gray-700 pb-6 bg-clip-border">
          {/* ...rest of your existing layout */}
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {isLoading ? (
            <p className="text-center text-2xl">Loading...</p>
          ) : error ? (
            <p className="text-center text-2xl text-red-500">
              Error loading products: {error.message}
            </p>
          ) : products?.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-2xl text-slate-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="p-4">
                    <input
                      type="checkbox"
                      className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3">Product Image</th>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">{product.description}</td>
                    <td className="px-6 py-4">{product.type}</td>
                    <td className="px-6 py-4">{product.price} VND</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/ProductUpdate/${product._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-2xl">No products found.</p>
          )}
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name}
      />
    </div>
  );
};

export default ProductList;
