import React from "react";
import Link from "react-router-dom";
const CreateOrder = () => {
  return (
    <div className="absolute top-0 w-full h-full left-0 p-10 shadow-md  grid grid-cols-2 gap-10">
      <div className="shadow-xl ">
        <div className="bg-white p-10">
          <h4 class="block text-4xl font-bold mb-5 text-green">New Invoice</h4>
          <p class="text-slate-800 text-3xl mb-5 font-light">
            Enter invoice information.
          </p>
          <p class="text-green text-4xl mt-10 font-semibold">Details</p>
          <div className="pl-5 ">
            <div className="flex gap-10">
              <div class="w-full my-5">
                <label class="block mb-5 text-3xl text-slate-600">
                  Invoice Number
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
              </div>

              <div class="w-full my-5">
                <label class="block mb-5 font-semibold text-3xl text-slate-600">
                  Product Brand
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
              </div>
            </div>

            <div className="flex gap-10">
              <div class="w-full my-5">
                <label class="block mb-5 font-semibold text-3xl text-slate-600">
                  Invoice From
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
              </div>

              <div class="w-full my-5">
                <label class="block mb-5 font-semibold text-3xl text-slate-600">
                  Invoice To
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="name"
                />
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
              <div className="relative w-full mb-3">
                <label
                  className="block my-5  text-slate-600  text-3xl font-semibold"
                  htmlFor="grid-password"
                >
                  Recipient Address
                </label>
                <input
                  type="text"
                  className="border border-slate-300 px-3 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                  placeholder="Dh.GTVT , 448 , Tang Nhon Phu A, TP.Thu Duc, TP.HCM"
                />
              </div>
            </div>
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
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="price"
                />
              </div>
              <div class="w-full">
                <label class="block my-5 font-semibold text-3xl text-slate-600">
                  Stock
                </label>
                <input
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  name="countInStock"
                />
              </div>
            </div>
            <div>
              <div class="w-full">
                <label class="block mb-5 font-semibold text-3xl text-slate-600">
                  Rating
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
        </div>
        {/* button */}
        <div className="flex justify-between items-center mt-10 bg-white p-10">
          <button
            type="button"
            className="text-slate-800 border border-cyan focus:bg-gradient-to-r from-cyan to-lime-500 hover:bg-gradient-to-br hover:text-white focus:text-white shadow-lg shadow-green-500/50 font-medium rounded-lg text-3xl px-5 py-5"
          >
            Save Product
          </button>
          <button
            type="button"
            className="text-slate-800 focus:text-white focus:bg-yellow-500 focus:border-none border border-cyan focus:shadow-lg font-medium rounded-lg text-3xl px-5 py-5"
          >
            Discard
          </button>
        </div>
      </div>
      {/* Split */}
      <div className=" shadow-md">
        <div class="relative  bg-white shadow-sm border border-slate-200 rounded-lg">
          <div class="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
            <img
              src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
              alt="card-image"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center mb-2">
              <h6 class="text-slate-800 text-xl font-semibold">
                Wooden House, Florida
              </h6>

              <div class="flex items-center gap-0 5 ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 text-yellow-600"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="text-slate-600 ml-1.5">5.0</span>
              </div>
            </div>

            <p class="text-slate-600 leading-normal font-light">
              Enter a freshly updated and thoughtfully furnished peaceful home
              surrounded by ancient trees, stone walls, and open meadows.
            </p>
          </div>

          <div class="group my-3 inline-flex flex-wrap justify-center items-center gap-2">
            <button
              class="rounded-full pointer-events-none border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z"
                  clip-rule="evenodd"
                />
                <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
              </svg>
            </button>
            <button
              class="rounded-full pointer-events-none border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.062 0 8.25 8.25 0 0 0-11.667 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.204 3.182a6 6 0 0 1 8.486 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0 3.75 3.75 0 0 0-5.304 0 .75.75 0 0 1-1.06 0l-.53-.53a.75.75 0 0 1 0-1.06Zm3.182 3.182a1.5 1.5 0 0 1 2.122 0 .75.75 0 0 1 0 1.061l-.53.53a.75.75 0 0 1-1.061 0l-.53-.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              class="rounded-full pointer-events-none border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </button>
            <button
              class="rounded-full pointer-events-none border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path d="M19.5 6h-15v9h15V6Z" />
                <path
                  fill-rule="evenodd"
                  d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              class="rounded-full pointer-events-none border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-4 h-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              class="rounded-full border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              + 20
            </button>
          </div>

          <div class="px-4 pb-4 pt-0 mt-2">
            <button
              class="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Reserve
            </button>
          </div>
        </div>

        <div className="bg-white p-10 my-10 ">
          <h4 class="text-4xl font-medium mb-10 text-slate-800">Catagory</h4>
          <div class="w-full">
            <label class="block mb-5 font-semibold text-3xl text-slate-600">
              Category
            </label>
            <input
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-300 rounded-md px-5 py-5 transition duration-300 ease focus:outline-none focus:border-cyan slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
              name="type"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              class="text-slate-800 border border-cyan focus:bg-gradient-to-r from-cyan to-lime-500 hover:bg-gradient-to-br hover:text-white focus:text-white  shadow-lg shadow-green-500/50  font-medium rounded-lg text-3xl px-5 py-5 text-center mt-10 ml-[310px]"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateOrder;
