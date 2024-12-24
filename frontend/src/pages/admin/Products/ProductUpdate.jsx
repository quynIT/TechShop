import React, { useEffect, useState } from "react";
import * as ProductService from '../../../services/ProductService'
import { useParams } from "react-router-dom";
import { getBase64 } from "../../../utils";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading/Loading";
import { message } from "antd";

const ProductUpdate = () => {
  // Get the product ID from the URL
  const { id } = useParams();
  const user = useSelector((state) => state?.user)

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  })

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id,
        token,
        ...rests } = data
      const res = ProductService.updateProduct(
        id,
        token,
        rests)
      return res
    }
  )

  const { data: dataUpdated, isPending: isPendingUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate
 
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success("Cập nhật sản phẩm thành công!")
    } else if (isErrorUpdated) {
      message.error()
    }
  }, [isSuccessUpdated])

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    })
  }

  const handleOnchangeAvatar = async (event) => {
    const files = event.target.files; // Lấy danh sách file từ input
    if (!files || files.length === 0) {
      console.error("No files provided.");
      return;
    }

    const file = files[0]; // Lấy file đầu tiên
    const preview = await getBase64(file); // Chuyển file thành Base64

    // Cập nhật state với hình ảnh preview
    setStateProductDetails({
      ...stateProductDetails,
      image: preview,
    });
  };

  // Fetch product details using the id
  const fetchGetDetailsProduct = async (id) => {
    const res = await ProductService.getDetailsProduct(id)
    if (res?.data) {
      setStateProductDetails({
        name: res?.data.name,
        price: res?.data.price,
        description: res?.data.description,
        rating: res?.data.rating,
        image: res?.data.image,
        type: res?.data.type,
        countInStock: res?.data.countInStock
      })
    }
  };

  // Use useEffect to fetch product details when the component is mounted or when id changes
  useEffect(() => {
    if (id) {
      fetchGetDetailsProduct(id);  // Fetch the product details using the 'id'
    }
  }, [id]);  // Only re-run this effect if 'id' changes

  const onUpdateProduct = (event) => {
    event.preventDefault(); // Ngăn reload trang
    const { name, price, description, rating, image, type, countInStock } = stateProductDetails;
  
    // Gửi dữ liệu cập nhật
    mutationUpdate.mutate({
      id: id,
      token: user.accessToken,
      name,
      price,
      description,
      rating,
      image,
      type,
      countInStock,
    }, {
      onSettled: () => {

      }
    });
  };

  return (
    <Loading isPending={isPendingUpdated}>
      <div className="grid grid-cols-3 gap-10">
        <div class="col-span-1 shadow shadow-sm border border-red-950 rounded-lg">
          <h5 className=" px-8 py-4 font-semibold text-3xl">Hình ảnh sản phẩm</h5>
          <div className="bg-white p-10">
            <img
              className="h-96 bg-white w-full object-cover object-center"
              src={stateProductDetails?.image || "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"}
              alt="Product"
            />

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
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
                    <span class="font-semibold">Click to upload</span> or drag and
                    drop
                  </p>
                  <p class="text-2xl text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={handleOnchangeAvatar} name="image" />
              </label>
            </div>
          </div>
          {/* <div class="p-8 flex gap-10">
          <button
            class="rounded-md bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Add to Cart
          </button>

          <button
            class="rounded-md bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Add to Cart
          </button>
        </div> */}
        </div>

        <div class="relative col-span-2 rounded-lg bg-white border border-slate-200 shadow-sm">
          <h5 className=" px-8 py-4 font-semibold text-3xl">
            Thông tin sản phẩm
          </h5>
          <div class="p-8">
            <div class="block overflow-visible">
              {/* <div class="w-full">
              <div class="relative right-0">
                <ul
                  class="relative flex flex-wrap px-1.5 py-1.5 list-none rounded-md bg-slate-100"
                  data-tabs="tabs"
                  role="tablist"
                >
                  <li class="z-30 flex-auto text-center">
                    <a
                      class="z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer text-slate-600 bg-inherit"
                      data-tab-target=""
                      role="tab"
                      aria-selected="true"
                    >
                      Pay with Card
                    </a>
                  </li>
                  <li class="z-30 flex-auto text-center">
                    <a
                      class="z-30 flex items-center justify-center w-full px-0 py-2 mb-0 text-sm transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-600 bg-inherit"
                      data-tab-target=""
                      role="tab"
                      aria-selected="false"
                    >
                      Pay with PayPal
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
              <div class="relative block w-full overflow-hidden !overflow-x-hidden !overflow-y-visible bg-transparent">
                <div role="tabpanel" data-value="card">
                  <form class="mt-8 flex flex-col">
                    <label class="block mb-1 text-sm text-slate-600 mt-4">
                      Product Name
                    </label>
                    <input
                      type="text"
                      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder={stateProductDetails.name}
                      onChange={handleOnChangeDetails} name="name"
                    />

                    <label class="block mb-1 text-sm text-slate-600 mt-4">
                      Product Description
                    </label>
                    <input
                      type="text"
                      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder=""
                      value={stateProductDetails.description} onChange={handleOnChangeDetails} name="description"
                    />

                    <label class="block mb-1 text-sm text-slate-600 mt-4">
                      Price
                    </label>
                    <input
                      type="text"
                      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder=""
                      value={stateProductDetails.price} onChange={handleOnChangeDetails} name="price"
                    />

                    <label class="block mb-1 text-sm text-slate-600 mt-4">
                      Stock
                    </label>
                    <input
                      type="text"
                      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder=""
                      value={stateProductDetails.countInStock} onChange={handleOnChangeDetails} name="countInStock"
                    />

                    <label class="block mb-1 text-sm text-slate-600 mt-4">
                      Rating
                    </label>
                    <input
                      type="text"
                      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder=""
                      value={stateProductDetails.rating} onChange={handleOnChangeDetails} name="rating"
                    />

                    <label class="block mb-1 text-sm text-slate-600 mt-4">
                      Category
                    </label>
                    <input
                      type="text"
                      class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder=""
                      value={stateProductDetails.type} onChange={handleOnChangeDetails} name="type"
                    />

                    <button class="w-full mt-6 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      onClick={onUpdateProduct}>
                      Update
                    </button>
                    {/* <p class="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 font-light">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      class="-mt-0.5 h-4 w-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Payments are secure and encrypted
                  </p> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};
export default ProductUpdate;
