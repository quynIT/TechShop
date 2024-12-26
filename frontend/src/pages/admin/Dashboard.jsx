import React from "react";
import { Link } from "react-router-dom";
import CardSocialTraffic from "../../components/CardComponent/CardTraffic";
import CardPageVisits from "../../components/CardComponent/CardPageVisit";

const Dashboard = () => {
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

      <div className="grid grid-cols-3 mt-10 gap-10">
        {/* Order Detail */}
        <div>
          <CardPageVisits />
        </div>
        {/* Order Approval */}
        <div className="col-span-2">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
