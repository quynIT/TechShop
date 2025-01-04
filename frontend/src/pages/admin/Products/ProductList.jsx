import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ProductService from "../../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import ProductModalComponent from "../../../components/ModalComponent/ProductModalComponent";

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  // Dùng cho việc sắp xếp tên sản phẩm
  const [sortOrder, setSortOrder] = useState("asc");
  // State cho từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  // State tạm thời cho từ khóa tìm kiếm
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  // State để cập nhật các lựa chọn theo ô vuông
  const [selectedProducts, setSelectedProducts] = useState([]);

  const user = useSelector((state) => state?.user);

  const {
    isPending,
    data: products = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await ProductService.getAllProduct();
      return res?.data || []; // Trả về mảng rỗng nếu không có dữ liệu
    },
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = ProductService.deleteManyProduct(ids, token);
    return res;
  });

  const {
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
    data: dataDeleted,
  } = mutationDelete;
  const {
    isSuccess: isSuccessDeletedManyProduct,
    isError: isErrorDeletedManyProduct,
    data: dataDeletedManyProduct,
  } = mutationDeleteMany;

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("Xóa sản phẩm thành công!");
      refetch(); // Refresh sản phẩm sau khi xóa
    } else if (isErrorDeleted) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  }, [isSuccessDeleted, refetch]);

  useEffect(() => {
    if (
      isSuccessDeletedManyProduct &&
      dataDeletedManyProduct?.status === "OK"
    ) {
      message.success("Xóa sản phẩm thành công!");
      refetch(); // Refresh sản phẩm sau khi xóa
    } else if (isErrorDeletedManyProduct) {
      message.error("Có lỗi xảy ra khi xóa sản phẩm!");
    }
  }, [isSuccessDeletedManyProduct, refetch]);

  // Hàm xử lý xác nhận xóa
  const handleDeleteConfirm = async () => {
    mutationDelete.mutate({
      id: productToDelete._id,
      token: user?.access_token,
    });
    setIsModalOpen(false); // Đóng modal sau khi xác nhận xóa
  };

  // Hàm xử lý việc mở modal với sản phẩm cần xóa
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleDeleteManyProduct = () => {
    if (selectedProducts.length > 0) {
      mutationDeleteMany.mutate({
        ids: selectedProducts,
        token: user?.access_token,
      });
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product._id));
    }
  };

  //Hàm sắp xếp tên sản phẩm
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name); // Sắp xếp tăng dần
    } else {
      return b.name.localeCompare(a.name); // Sắp xếp giảm dần
    }
  });

  // Lọc sản phẩm theo tên dựa trên từ khóa tìm kiếm
  const filteredProducts = sortedProducts.filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm không phân biệt hoa thường
  );

  // Cập nhật giá trị khi người dùng nhập vào ô tìm kiếm
  const handleSearchInputChange = (e) => {
    setTempSearchTerm(e.target.value);
  };

  // Cập nhật searchTerm khi nhấn nút tìm kiếm
  const handleSearchClick = () => {
    setSearchTerm(tempSearchTerm); // Chỉ cập nhật searchTerm khi nhấn nút Search
  };

  return (
    <div className="p-10 absolute top-0 left-0 w-full">
      <div className="p-10 bg-white shadow-md">
        <div class=" relative overflow-hidden text-gray-700 pb-6 bg-clip-border">
          <div class="flex items-center justify-between gap-8 mb-8">
            <div>
              <h5 class="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Product list
              </h5>
              <p class="block mt-1 font-sans antialiased font-normal leading-relaxed text-3xl text-gray-700">
                See information about all products
              </p>
            </div>
          </div>
          <div className=" flex justify-start gap-10">
            <div class="w-full gg-red max-w-lg min-w-[200px] justify-start">
              <div class="relative">
                <select class="w-full bg-transparent placeholder:text-slate-400 shadow-md text-slate-700 text-3xl border border-slate-300 rounded px-5 pr-8 py-4 transition duration-300 ease focus:outline-none focus:border-cyan hover:border-green shadow-green/30 focus:shadow-md appearance-none cursor-pointer">
                  <option value="brazil">Brazil</option>
                  <option value="bucharest">Bucharest</option>
                  <option value="london">London</option>
                  <option value="washington">Washington</option>
                </select>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.2"
                  stroke="currentColor"
                  class="h-10 w-10 ml-1 absolute top-3.5 right-2.5 text-slate-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
            </div>

            <div class="relative flex-1 w-full sm:w-[40rem] min-w-[200px] ">
              <div className="flex gap-4 ">
                <div className="w-full max-w-md sm:w-[200px] lg:min-w-[350px]">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 25 25"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="absolute w-10 h-10 top-5 left-5 text-slate-600"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                    <input
                      id="search_content"
                      type="text"
                      className="w-full pl-16 px-3 py-4 bg-transparent shadow-md shadow-green/30 placeholder:text-slate-700 text-slate-600 md:text-3xl border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-cyan hover:border-green focus:shadow"
                      placeholder="Search for products..."
                      value={tempSearchTerm} // Gắn giá trị từ tempSearchTerm
                      onChange={handleSearchInputChange} // Cập nhật giá trị tạm thời khi người dùng nhập liệu
                    />
                  </div>
                </div>
                <button
                  id="search_button"
                  className="flex select-none items-center justify-end gap-3 rounded-lg  py-2 px-4 text-center font-sans text-xl font-bold uppercase border border-slate-300 text-slate-700 shadow-md shadow-gray-900/10 
                hover:border-green active:border-leave focus:border-cyan focus:text-white 
                transition-all hober:border-green hover:shadow-lg hover:shadow-gray-900/20 focus:bg-green focus:shadow-leave active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={handleSearchClick} // Cập nhật searchTerm khi nhấn nút
                >
                  Search
                </button>
              </div>
            </div>
            {/* delete many button */}
            <button
              class={`flex select-none items-center justify-center gap-3 rounded-lg duration-300 bg-red-600 py-2 px-4 text-center font-sans text-xl font-semibold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:bg-yellow-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                ${
                  selectedProducts.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              type="button"
              onClick={handleDeleteManyProduct}
              disabled={selectedProducts.length === 0}
            >
              <svg
                class=" w-10 h-10 text-white  "
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
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
              Delete All
            </button>

            {/* Add product */}
            <Link to="/admin/ProductCreate">
              <button
                class="flex select-none items-center justify-center gap-3 rounded-lg duration-300 bg-yellow-500 py-4 px-4 text-center font-sans text-xl font-semibold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:bg-yellow-300 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  stroke-width="2"
                  class="w-10 h-10"
                >
                  <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                </svg>
                Add product
              </button>
            </Link>
          </div>
        </div>
        <Loading isPending={isPending}>
          <div class="relative overflow-x-auto shadow-md mt-10 border border-gray-200 sm:rounded-lg">
            <table class="w-full text-3xl text-left rtl:text-right text-slate-600 dark:text-gray-400">
              <thead class=" text-slate-600 font-sans bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSelectAll}
                        checked={selectedProducts.length === products.length}
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Product Image
                  </th>
                  <th scope="col" class="px-6 py-3 text-left">
                    <div class="flex items-center space-x-2">
                      <span class="font-semibold">Product Name</span>
                      <button
                        onClick={() =>
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                        }
                        className="text-sm text-blue-500 hover:underline px-2 py-1 border border-blue-500 rounded-md transition-colors hover:bg-blue-500 hover:text-white"
                      >
                        ({sortOrder === "asc" ? "Ascending" : "Descending"})
                      </button>
                    </div>
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td class="w-10 px-4 py-10">
                      <div class="flex items-center">
                        <input
                          id={`checkbox-${product._id}`}
                          type="checkbox"
                          class="w-10 h-10 py-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleSelectProduct(product._id)}
                        />
                        <label
                          htmlFor={`checkbox-${product._id}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td class="p-4 border-b border-slate-200 py-5">
                      <img
                        src={product.image}
                        alt={product.name}
                        class="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td class="px-6 py-4">{product.description}</td>
                    <td class="px-6 py-4">{product.type}</td>
                    <td class="px-6 py-4">{product.price} VND</td>
                    <td class="px-6 py-4">
                      <Link to={`/admin/ProductUpdate/${product._id}`}>
                        <button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            class="inline w-12 h-12 text-leave active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                          </svg>
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                      >
                        <svg
                          class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-xl rounded-lg "
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
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Page split */}
            <div class="flex items-center justify-end p-4 border-t border-blue-gray-50">
              <div class="flex space-x-1">
                <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                  Prev
                </button>
                <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                  1
                </button>
                <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                  2
                </button>
                <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                  3
                </button>
                <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                  Next
                </button>
              </div>
            </div>
          </div>
        </Loading>
      </div>
      {/* Modal for Delete Confirmation */}
      <ProductModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        productName={productToDelete?.name}
      />
    </div>
  );
};

export default ProductList;
