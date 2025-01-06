import React from "react";
import { Link } from "react-router-dom";
const CardSetting = () => {
  return (
    <>
      <div className=" h-full w-full shadow-lg rounded-lg-lg bg-white ">
        <div className=" rounded-lg-t bg-white px-6 py-6">
          <div className="text-center flex justify-between">
            <h4 className="text-blueGray-700 text-5xl font-bold">My account</h4>
            <Link to="/admin/CustomerList">
              <button
                className="bg-yellow-500 text-white active:bg-yellow-300 font-semibold text-3xl p-5  rounded-lg-lg shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear   "
                type="button"
              >
                View all
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h4 className="text-slate-600  text-3xl mt-3 mb-6 font-bold  ">
              Account Information
            </h4>
            <div className="grid grid-cols-2 ">
              <div className="mb-5">
                <div className="w-full px-4">
                  <div className="relative w-full mb-10">
                    <label
                      className="block text-slate-600 font-sans text-3xl font-semibold mb-5"
                      htmlFor="grid-password"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="border px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  border-slate-300 text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                      placeholder="lucky.jesse"
                    />
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="relative w-full ">
                    <label
                      className="block  font-sans text-slate-600  text-3xl font-semibold mb-5"
                      htmlFor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border border-slate-300 px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                      placeholder="Lucky"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full px-4">
                  <div className="relative w-full mb-10">
                    <label
                      className="block text-slate-600  text-3xl font-sans font-semibold mb-5"
                      htmlFor="grid-password"
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      className="border border-slate-300 px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white   rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                      placeholder="jesse@example.com"
                    />
                  </div>
                </div>

                <div className="w-full px-4">
                  <div className="relative w-full ">
                    <label
                      className="block font-sans text-slate-600  text-3xl font-semibold mb-5"
                      htmlFor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border border-slate-300 px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear"
                      placeholder="Jesse"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />
            {/* contact */}
            <h6 className="text-blueGray-400  text-3xl mt-3 mb-6 font-semibold  ">
              Contact Information
            </h6>
            <div className="flex  flex-wrap">
              <div className=" flex w-full gap-10 px-4 pb-10">
                <div className="w-full">
                  <label
                    className="block mb-5  text-slate-600  text-3xl font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    PhoneNumber
                  </label>
                  <div class="relative">
                    <div class="absolute inset-y-0 p-4 start-0 top-0 flex items-center pointer-events-none ">
                      <svg
                        class="w-10 h-10 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 19 18"
                      >
                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="phone-input"
                      aria-describedby="helper-text-explanation"
                      class="bg-white border border-gray-300 text-slate-600 shadow text-3xl rounded-lg focus:border-cyan focus:outline-none block w-full px-16 py-5"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      placeholder="123-456-7890"
                      required
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label
                    className="block  mb-5 text-slate-600  text-3xl font-semibold"
                    htmlFor="grid-password"
                  >
                    Date
                  </label>
                  <div class="relative ">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        class="w-10 h-10 text-slate-600 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      datepicker
                      id="default-datepicker"
                      type="text"
                      class="bg-white border border-gray-300 text-slate-600 text-3xl rounded-lg  focus:border-cyan focus:outline-none block w-full px-16 shadow py-5 "
                      placeholder="Select date"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block mb-5  text-slate-600  text-3xl font-semibold"
                    htmlFor="grid-password"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="border border-slate-300 px-3 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                    placeholder="Dh.GTVT , 448 , Tang Nhon Phu A, TP.Thu Duc, TP.HCM"
                  />
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400  text-3xl mt-3 mb-6 font-semibold  ">
              About Me
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block   text-slate-600  text-3xl font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="border border-slate-300 px-3 py-3 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                    placeholder="A beautiful UI Kit and Admin for React & Tailwind CSS. It is Free and Open Source."
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CardSetting;
