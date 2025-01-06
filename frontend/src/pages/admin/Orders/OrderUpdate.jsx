import React from "react";
import { Link } from "react-router-dom";
const OrderUpdate = () => {
  return (
    <div className="relative top-0 w-full h-full left-0  shadow-sm  grid grid-cols-2 gap-10">
      <div className="shadow-xl">
        <div className="bg-white p-10">
          <h4 class="block text-4xl font-semibold mb-5 text-green">
            Update Invoice
          </h4>
          <p class="text-slate-800 text-3xl mb-5 font-light">
            Enter invoice updated  information.
          </p>
          <div>
            <div className="flex gap-10 border border-slate-200 px-5 pb-2 rounded-lg bg-slate-100">
              <div class="w-full my-5">
                <label class="block mb-2 text-3xl text-slate-600">
                  Invoice Number
                </label>
                <input
                  class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
              </div>

              <div class="w-full my-5">
                <label class="block mb-2 text-3xl text-slate-600">
                  Invoice From
                </label>
                <input
                  class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
              </div>
            </div>
          </div>
          {/* detail */}
          <p class="text-green text-4xl mt-10 font-semibold">Details</p>
          <div className="pl-5 pb-10 border-b-2 border-slate-300 bg-red">
            <div className="flex gap-10 ">
              <div class="w-full my-5">
                <label class="block mb-2 text-3xl text-slate-600">
                  Invoice To
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
              </div>

              <div class="w-full my-5">
                <label class="block mb-2 text-3xl text-slate-600">
                  Phone Number
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
              </div>
            </div>

            <div className="flex gap-10">
              <div className="w-full">
                <label class="block mb-2 text-3xl text-slate-600">
                  Issue Date
                </label>
                <div className="relative">
                  <input
                    datepicker
                    id="default-datepicker"
                    type="text"
                    class="border border-slate-300 text-slate-600  text-3xl rounded-lg  focus:border-cyan focus:outline-none block w-full pe-16 p-5 "
                    placeholder="Select date"
                  />
                  <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      class="w-10 h-10 text-green "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="w-full">
                <label class="block mb-2 text-3xl text-slate-600">
                  Due Date
                </label>
                <div className="relative">
                  <input
                    datepicker
                    id="default-datepicker"
                    type="text"
                    class="border border-slate-300 text-slate-600  text-3xl rounded-lg  focus:border-cyan focus:outline-none block w-full pe-16 p-5 "
                    placeholder="Select date"
                  />
                  <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                    <svg
                      class="w-10 h-10 text-green "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="my-10">
                      <label
                        for="message"
                        class="block mb-5 text-3xl font-medium text-slate-600 dark:text-white"
                      >
                        Product Description
                      </label>
                      <textarea
                        class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-slate-300  bg-transparent px-4 py-5 font-sans text-3xl font-normal text-blue-gray-700 outline outline-0 transition-all focus:placeholder-shown:border focus:placeholder-shown:border-cyan focus:placeholder-shown:border-t-leave focus:border-2 focus:border-cyan focus:border-t-leave focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" Write description............ "
                        name="description"
                      ></textarea>
                    </div> */}
            <div className="w-full">
              <div className="relative w-full">
                <label
                  className="block my-5  text-slate-600  text-3xl"
                  htmlFor="grid-password"
                >
                  Recipient Address
                </label>
                <input
                  type="text"
                  className="border border-slate-300 p-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl focus:outline-none focus:border-cyan w-full ease-linear   "
                  placeholder="Dh.GTVT , 448 , Tang Nhon Phu A, TP.Thu Duc, TP.HCM"
                />
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="my-10 bg-white ">
            <h4 class="block text-4xl font-semibold mb-10 text-green">
              Invoice Items
            </h4>
            <div class="w-full">
              <label class="block my-5 font-semibold text-3xl text-slate-600">
                Category
              </label>
              <div class="relative">
                <select class="w-full bg-transparent placeholder:text-slate-400 s text-slate-700 text-3xl border border-slate-300 rounded px-5 pr-8 py-5 transition duration-300 ease focus:outline-none focus:border-cyan hover:border-green shadow-green/30 focus:shadow-md appearance-none cursor-pointer">
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
            <div className="grid grid-cols-2 mt-5 gap-10">
              <div>
                <div class="w-full">
                  <label class="block mb-5  text-3xl text-slate-600">
                    Item Name
                  </label>
                  <input
                    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                    name="price"
                  />
                </div>
              </div>
              <div className=" flex gap-5">
                <div class="w-full">
                  <label class="block mb-5 font-semibold text-3xl text-slate-600">
                    Price
                  </label>
                  <input
                    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                    name="rating"
                  />
                </div>

                <div class="w-1/7">
                  <label class="block mb-5 font-semibold text-3xl text-slate-600">
                    Qty
                  </label>
                  <input
                    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type..."
                    name="rating"
                  />
                </div>

                <div class="w-full">
                  <label class="block mb-5 font-semibold text-3xl text-slate-600">
                    Total
                  </label>
                  <input
                    class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Type here..."
                    name="rating"
                  />
                </div>
                {/* <div class="w-full">
                        <label class="block my-5 font-semibold text-3xl text-slate-600">
                          DiscountType
                        </label>
                        <div class="relative">
                          <select class="w-full bg-transparent placeholder:text-slate-400 s text-slate-700 text-3xl border border-slate-300 rounded px-5 pr-8 py-5 transition duration-300 ease focus:outline-none focus:border-cyan hover:border-green shadow-green/30 focus:shadow-md appearance-none cursor-pointer">
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
                      </div> */}
              </div>
            </div>

            <button
              type="button"
              className="flex items-center py-5 mt-5 text-3xl font-medium text-green bg-white rounded-lg hover:text-cyan active:text-leave"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-10 h-10 "
                viewBox="0 0 20 20"
              >
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3H6a1 1 0 0 1 0-2h3V6a1 1 0 0 1 1-1z" />
              </svg>
              Add Item
            </button>
          </div>
        </div>
      </div>
      {/* Split */}
      <div className=" shadow-md bg-gray-200 p-10 ">
        <h4 class="block text-4xl font-semibold mb-5 text-green">Preview</h4>
        <div>
          <div class="relative p-16 bg-white  shadow-sm border border-slate-200 rounded-lg">
            <div className="border-b-2 border-gray-300">
              <div className=" flex justify-between">
                <div className="block text-5xl font-bold  text-green">
                  Invoice
                  <span className="text-transparent bg-clip-text bg-gradient-to-r to-leave from-green">
                    HD001
                  </span>
                </div>

                <div className="block text-5xl font-light  text-green">
                  TechShop
                </div>
              </div>

              <div className="flex justify-between">
                <div className="text-3xl text-slate-700 my-5">
                  Invoice From: staff name
                </div>
                <div className="text-3xl text-slate-700 my-5">
                  CreateAT: 26/12/2024
                </div>
              </div>
            </div>

            <div className="my-10 px-10 flex justify-between gap-10">
              <div className="w-full">
                <div className="text-3xl text-slate-700">
                  Customer Name: customername
                </div>
                <div className="text-3xl text-slate-700 my-3">
                  Phone Number: customername
                </div>
              </div>

              <div className="w-full">
                <div className="text-3xl text-slate-700">
                  Address: Dh.GTVT , 448 , Tang Nhon Phu A, TP.Thu Duc, TP.HCM
                </div>
              </div>
            </div>

            <div className="text-4xl text-slate-700 font-medium">
              Invoice Detail
            </div>
            {/* display preview invoice table */}
            <div class="relative overflow-x-auto my-10 bg-red-200">
              <table class="w-full  text-3xl text-left rtl:text-right text-slate-600 ">
                <thead class="text-3xl text-slate-600  bg-gray-100 ">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-6 font-semibold text-slate-600 whitespace-nowrap dark:text-white"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-6">Silver</td>
                    <td class="px-6 py-6">Laptop</td>
                    <td class="px-6 py-6">$2999</td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-6 font-medium text-slate-600 whitespace-nowrap dark:text-white"
                    >
                      Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-6">White</td>
                    <td class="px-6 py-6">Laptop PC</td>
                    <td class="px-6 py-6">$1999</td>
                  </tr>
                  <tr class="bg-white border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-6 font-medium text-slate-600 whitespace-nowrap dark:text-white"
                    >
                      Magic Mouse 2
                    </th>
                    <td class="px-6 py-6">Black</td>
                    <td class="px-6 py-6">Accessories</td>
                    <td class="px-6 py-6">$99</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between px-6">
              <div className="text-3xl text-slate-600 font-semibold ">
                Grand ToTal
              </div>
              <div className="text-3xl text-slate-600 font-semibold ">
                $100000000000000000000
              </div>
            </div>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-between items-center mt-10 bg-white p-10">
          <button
            type="button"
            className="text-slate-800 border border-cyan active:bg-gradient-to-r from-cyan to-lime-500 hover:bg-gradient-to-br hover:text-white  shadow-lg shadow-green-500/50 font-medium rounded-lg text-3xl px-5 py-5"
          >
            Save Invoice
          </button>
          <Link to="/admin/OrderList">
            <button
              type="button"
              className="text-white focus:text-white bg-yellow-500 active:bg-yellow-300 active:shadow-lg font-medium rounded-lg text-3xl px-5 py-5"
            >
              Discard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderUpdate;
