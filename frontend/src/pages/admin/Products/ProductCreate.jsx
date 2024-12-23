import React from "react";
const ProductCreate = () => {
  return (
    <div className="absolute top-0 w-full h-full left-0 p-10  grid grid-cols-2 gap-10">
      <div className=" ">
        <div className="bg-white p-10">
          <h4 class="block text-4xl font-medium mb-5 text-slate-800">
            Product Information
          </h4>
          <p class="text-slate-800 text-3xl mb-5 font-light">
            Nice to meet you! Enter your details product information.
          </p>

          <div class="w-full">
            <label class="block mb-5 font-semibold text-3xl text-slate-600">
              DiscountType
            </label>
            <input
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>

          <div className="my-10">
            <label
              for="message"
              class="block mb-5 text-3xl font-medium text-slate-600 dark:text-white"
            >
              Your message
            </label>
            <textarea
              class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-red-500 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-3xl font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-cyan placeholder-shown:border-t-leave focus:border-2 focus:border-cyan focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" Write description............ "
            ></textarea>
          </div>
        </div>

        <div className="my-10 bg-white p-10">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div class="w-full">
                <label class="block mb-5 font-semibold text-3xl text-slate-600">
                  Price
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                />
              </div>
              <div class="w-full">
                <label class="block my-5 font-semibold text-3xl text-slate-600">
                  Stock
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                />
              </div>
            </div>
            <div>
              <div class="w-full">
                <label class="block mb-5 font-semibold text-3xl text-slate-600">
                  Discount
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                />
              </div>
              <div class="w-full">
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Split */}
      <div className="">
        <div className="bg-white p-10">
          <img
            className="h-96 bg-white w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
            alt="nature image"
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
              <input id="dropzone-file" type="file" class="hidden" />
            </label>
          </div>
        </div>

        <div className="bg-white p-10 my-10 ">
          <h4 class="text-4xl font-medium mb-10 text-slate-800">Catagory</h4>
          <div class="w-full ">
            <label class="block my-5 font-semibold text-3xl text-slate-600">
              CategoryName
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

          <button
            type="button"
            class="text-white bg-gradient-to-br from-cyan to-leave hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-lime-400 dark:focus:ring-green-800 font-medium rounded-lg text-3xl px-5 py-4 text-center me-2 my-10 "
          >
            Add Category
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;
