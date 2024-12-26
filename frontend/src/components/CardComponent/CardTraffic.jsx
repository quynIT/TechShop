import React from "react";
import { Link } from "react-router-dom";
const CardSocialTraffic = () => {
  return (
    <>
      <div className="relative flex flex-col bg-white break-words  w-full p-10 shadow-lg rounded">
        <div className="rounded-t ">
          <div className="flex flex-wrap items-center ">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-4xl text-green">Order Approval</h3>
            </div>
            <Link to="/admin/OrderList">
              <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-yellow-500 text-white active:bg-yellow-300 text-2xl font-bold uppercase p-5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Order List
                </button>
              </div>
            </Link>
          </div>
        </div>
        <div className="block w-full  overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-slate-600 align-middle border border-solid border-blueGray-100 py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Invoice Number
                </th>
                <th className="px-6 bg-blueGray-50 text-slate-600 align-middle border border-solid border-blueGray-100 py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Customer
                </th>
                <th className="px-6 bg-blueGray-50 text-slate-600 align-middle border border-solid border-blueGray-100 py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Qty
                </th>
                <th className="px-6 bg-blueGray-50 text-slate-600 align-middle border border-solid border-blueGray-100 py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total
                </th>
                <th className="px-6 bg-blueGray-50 text-slate-600 align-middle border border-solid border-blueGray-100 py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  CreateAt
                </th>

                <th className="px-6 bg-blueGray-50 text-slate-600 align-middle border border-solid border-blueGray-100 py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px">
                  Payment
                </th>
                <th className="px-6 bg-blueGray-50 text-slate-600 align-middle border border-solid border-blueGray-100 py-3 text-2xl uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  CreateAt
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100  border-b border-blue-gray-100">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left">
                  HD001
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  27/12/2024
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  Cash
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  <svg
                    class="inline w-14 h-14 font-bold text-lime-400 rounded-full active:bg-gray-50 mr-3 hover:bg-white hover:shadow-md "
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  <svg
                    class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg "
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
                </td>
              </tr>

              <tr className="hover:bg-gray-100  border-b border-blue-gray-100">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left">
                  HD001
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  27/12/2024
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  Cash
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  <svg
                    class="inline w-14 h-14 font-bold text-lime-400 rounded-full active:bg-gray-50 mr-3 hover:bg-white hover:shadow-md "
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  <svg
                    class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg "
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
                </td>
              </tr>

              <tr className="hover:bg-gray-100  border-b border-blue-gray-100">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left">
                  HD001
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  27/12/2024
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  Cash
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  <svg
                    class="inline w-14 h-14 font-bold text-lime-400 rounded-full active:bg-gray-50 mr-3 hover:bg-white hover:shadow-md "
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  <svg
                    class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg "
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
                </td>
              </tr>

              <tr className="hover:bg-gray-100  border-b border-blue-gray-100">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left">
                  HD001
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  27/12/2024
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  Cash
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  <svg
                    class="inline w-14 h-14 font-bold text-lime-400 rounded-full active:bg-gray-50 mr-3 hover:bg-white hover:shadow-md "
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  <svg
                    class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg "
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
                </td>
              </tr>

              <tr className="hover:bg-gray-100  border-b border-blue-gray-100">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left">
                  HD001
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  27/12/2024
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  Cash
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  <svg
                    class="inline w-14 h-14 font-bold text-lime-400 rounded-full active:bg-gray-50 mr-3 hover:bg-white hover:shadow-md "
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  <svg
                    class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg "
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
                </td>
              </tr>

              <tr className="hover:bg-gray-100  border-b border-blue-gray-100">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left">
                  HD001
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  27/12/2024
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  Cash
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  <svg
                    class="inline w-14 h-14 font-bold text-lime-400 rounded-full active:bg-gray-50 mr-3 hover:bg-white hover:shadow-md "
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  <svg
                    class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg "
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
                </td>
              </tr>
              <tr className="hover:bg-gray-100  border-b border-blue-gray-100">
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4 text-left">
                  HD001
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  1,480
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  27/12/2024
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  Cash
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-2xl whitespace-nowrap p-4">
                  <svg
                    class="inline w-14 h-14 font-bold text-lime-400 rounded-full active:bg-gray-50 mr-3 hover:bg-white hover:shadow-md "
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
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  <svg
                    class="inline w-12 h-12 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-md rounded-lg "
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
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex items-center justify-end p-4 border-b border-blue-gray-100">
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
      </div>
    </>
  );
};
export default CardSocialTraffic;
