import React, { useEffect, useState } from "react";
import { getBase64 } from "../../../utils";
import Loading from "../../../components/Loading/Loading";
import * as ProductService from "../../../services/ProductService";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as message from "../../../components/Message/Message";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ProductCreate = () => {
  // State để hiển thị các type khi nhấn drop down
  const [types, setTypes] = useState([]);
  // State để kiểm soát việc hiển thị input thêm type mới
  const [showAddTypeInput, setShowAddTypeInput] = useState(false);
  const [newType, setNewType] = useState('');
  // State để validate các trường nhập
  const [errors, setErrors] = useState({});

  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    description: "",
    rating: "",
    image: "",
    type: "",
    countInStock: ""
  });

  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock: countInStock,
    } = data;

    const res = ProductService.createProduct({
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
    });
    return res;
  });

  // Sử dụng useQuery để fetch types
  const { data: typeData } = useQuery({
    queryKey: ["product-types"],
    queryFn: async () => {
      const res = await ProductService.getAllTypeProduct();
      return res?.data || [];
    },
  });

  // Cập nhật types khi có dữ liệu từ backend
  useEffect(() => {
    if (typeData) {
      setTypes(typeData);
    }
  }, [typeData]);

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      setStateProduct({
        name: "",
        price: "",
        description: "",
        rating: "",
        image: "",
        type: "",
        countInStock: "",
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError, data]);

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async (event) => {
    const files = event.target.files; // Lấy danh sách file từ input
    if (!files || files.length === 0) {
      console.error("No files provided.");
      return;
    }

    const file = files[0]; // Lấy file đầu tiên
    const preview = await getBase64(file); // Chuyển file thành Base64

    // Cập nhật state với hình ảnh preview
    setStateProduct({
      ...stateProduct,
      image: preview,
    });
  };

  const handleOnChangeSelect = (e) => {
    const value = e.target.value;

    if (value === 'add_new_type') {
      setShowAddTypeInput(true);
      setStateProduct({
        ...stateProduct,
        type: ''
      });
    } else {
      setShowAddTypeInput(false);
      setStateProduct({
        ...stateProduct,
        type: value
      });
    }
  }

  // Hàm để hủy thêm type mới
  const handleCancelAddType = () => {
    setShowAddTypeInput(false);
    setNewType('');
    setStateProduct(prev => ({
      ...prev,
      type: '' // Reset type về trạng thái ban đầu
    }));
  }

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!stateProduct.name.trim()) {
      newErrors.name = "Product name cannot be blank";
    }

    // Validate price
    if (!stateProduct.price.trim()) {
      newErrors.price = "Product price cannot be blank";
    } else if (isNaN(Number(stateProduct.price)) || Number(stateProduct.price) <= 0) {
      newErrors.price = "Product price must be positive";
    }

    // Validate description
    if (!stateProduct.description.trim()) {
      newErrors.description = "Product description cannot be blank";
    }

    // Validate rating
    if (!stateProduct.rating.trim()) {
      newErrors.rating = "Product rating cannot be blank";
    } else if (
      isNaN(Number(stateProduct.rating)) ||
      Number(stateProduct.rating) < 0 ||
      Number(stateProduct.rating) > 5
    ) {
      newErrors.rating = "Rating must be a number from 0 to 5";
    }

    // Validate countInStock
    if (!stateProduct.countInStock.trim()) {
      newErrors.countInStock = "Stock quantity cannot be blank";
    } else if (isNaN(Number(stateProduct.countInStock)) || Number(stateProduct.countInStock) < 0) {
      newErrors.countInStock = "The quantity in stock must be non-negative";
    }

    // Validate type
    if (!stateProduct.type.trim()) {
      newErrors.type = "Please select product type";
    }

    // Validate image
    if (!stateProduct.image) {
      newErrors.image = "Please select product image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFinish = () => {
    if (validateForm()) {
      mutation.mutate(stateProduct);
    } else {
      message.error("Please fill in the information completely and accurately");
    }
  };

  return (
    <Loading isPending={isPending}>
      <div className="w-full h-full left-0 grid grid-cols-3 gap-10">
        <div className=" col-span-2">
          <div className="bg-white p-10">
            <h4 class="block text-4xl font-medium mb-5 text-slate-800">
              Product Information
            </h4>
            <p class="text-slate-800 text-3xl mb-5 font-light">
              Nice to meet you! Enter your details product information.
            </p>
            <div className="flex gap-10">
              <div class="w-full">
                <label class="block mb-5 font-semibold text-3xl text-slate-600">
                  Product Name
                </label>
                <input
                  class={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.name ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                    } rounded-md px-5 py-5`}
                  placeholder="Your product name"
                  value={stateProduct.name}
                  onChange={handleOnChange}
                  name="name"
                />
                {errors.name && (
                  <p className="text-red-500 text-2xl mt-2">{errors.name}</p>
                )}
              </div>
            </div>

            <div className="my-10">
              <label
                for="message"
                class="block mb-5 text-3xl font-medium text-slate-600 dark:text-white"
              >
                Product Description
              </label>
              <textarea
                class={`w-full bg-transparent placeholder:text-slate-400 text-slate-600 outline-none text-3xl border ${errors.description ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                  } rounded-md px-5 py-5`}
                placeholder="Your product description"
                value={stateProduct.description}
                onChange={handleOnChange}
                name="description"
              >
              </textarea>
              {errors.description && (
                <p className="text-red-500 text-2xl mt-2">{errors.description}</p>
              )}
            </div>
          </div>
          {/* Pricing and stock */}
          <div className="my-10 bg-white p-10">
            <h4 class="block text-4xl font-medium mb-10 text-slate-800">
              Pricing and Stock
            </h4>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <div class="w-full">
                  <label class="block mb-5 font-semibold text-3xl text-slate-600">
                    Price
                  </label>
                  <input
                    class={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.price ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                      } rounded-md px-5 py-5`}
                    placeholder="Your product price"
                    value={stateProduct.price}
                    onChange={handleOnChange}
                    name="price"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-2xl mt-2">{errors.price}</p>
                  )}
                </div>
                <div class="w-full">
                  <label class="block my-5 font-semibold text-3xl text-slate-600">
                    Stock
                  </label>
                  <input
                    class={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.countInStock ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                      } rounded-md px-5 py-5`}
                    placeholder="Your product stock"
                    value={stateProduct.countInStock}
                    onChange={handleOnChange}
                    name="countInStock"
                  />
                  {errors.countInStock && (
                    <p className="text-red-500 text-2xl mt-2">{errors.countInStock}</p>
                  )}
                </div>
              </div>
              <div>
                <div class="w-full">
                  <label class="block mb-5 font-semibold text-3xl text-slate-600">
                    Rating
                  </label>
                  <input
                    class={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.rating ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                      } rounded-md px-5 py-5`}
                    placeholder="Your product rating"
                    value={stateProduct.rating}
                    onChange={handleOnChange}
                    name="rating"
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-2xl mt-2">{errors.rating}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="flex justify-between items-cente bg-white p-10">
            <button
              type="button"
              className="text-slate-800 border border-cyan focus:bg-gradient-to-r from-cyan to-lime-500 hover:bg-gradient-to-br hover:text-white focus:text-white shadow-lg shadow-green-500/50 font-medium rounded-lg text-3xl px-5 py-5"
              onClick={onFinish}
            >
              Add Product
            </button>
            <Link to="/admin/ProductList">
              <button
                type="button"
                className="text-slate-800 focus:text-white bg-yellow-500 active:bg-yellow-300 focus:border-none focus:shadow-lg font-medium rounded-lg text-3xl px-5 py-5"
              >
                Discard
              </button>
            </Link>
          </div>
        </div>
        {/* Image */}
        <div className="">
          <div className="bg-white p-10">
            <img
              className="h-96 bg-white w-full object-cover object-center"
              src={
                stateProduct?.image ||
                "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
              }
              alt="Product"
            />

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class={`flex flex-col items-center justify-center w-full h-64 border-2 ${errors.image ? 'border-red-500' : 'border-gray-300'
                  } border-dashed rounded-lg cursor-pointer bg-gray-50`}
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-2xl text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-2xl text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onChange={handleOnchangeAvatar}
                  name="image"
                />
              </label>
            </div>
            {errors.image && (
              <p className="text-red-500 text-2xl mt-2">{errors.image}</p>
            )}
          </div>

          <div className="bg-white p-10 my-10 ">
            <h4 class="text-4xl font-medium mb-10 text-slate-800">Catagory</h4>
            <div class="w-full">
              <label class="block mb-5 font-semibold text-3xl text-slate-600">
                Category
              </label>
              {!showAddTypeInput ? (
                <div>
                  <select
                    className={`w-full bg-transparent outline-none placeholder:text-slate-400 hover: bg-gray-50 text-slate-600 text-3xl border ${errors.type ? 'border-red-500' : 'border-slate-300'
                      } rounded-md px-5 py-5`}
                    value={stateProduct.type}
                    onChange={handleOnChangeSelect}
                    name="type"
                  >
                    <option value="">Select a category</option>
                    {types.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                    <option value="add_new_type" className="font-bold">+ Add NewType</option>
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-2xl mt-2">{errors.type}</p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="mt-5 flex items-center space-x-3">
                    <input
                      className={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-600 text-3xl border ${errors.type ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                        } rounded-md px-5 py-5`}
                      placeholder="Enter new type"
                      value={newType}
                      onChange={(e) => {
                        setNewType(e.target.value);
                        setStateProduct({
                          ...stateProduct,
                          type: e.target.value
                        });
                      }}
                    />
                    <button
                      onClick={handleCancelAddType}
                      className="text-slate-800 border border-cyan focus:bg-gradient-to-r from-cyan to-lime-500 hover:bg-gradient-to-br hover:text-white focus:text-white shadow-lg shadow-green-500/50 font-medium rounded-lg text-3xl px-5 py-5"
                    >
                      Cancel
                    </button>
                  </div>
                  {errors.type && (
                    <p className="text-red-500 text-2xl mt-2">{errors.type}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default ProductCreate;