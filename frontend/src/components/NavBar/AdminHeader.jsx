import { Sidebar } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import MenuItem from "../CardComponent/MenuItem";
const AdminHeader = () => {
  return (
    <>
      <nav className=" w-full bg-white shadow-md rounded-md ">
        <div className=" p-5 mx-auto text-slate-800">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2">
              <Link
                to="/sign-in"
                className="hidden md:block cursor-pointer py-3 text-4xl text-slate-800 active:text-cyan font-semibold"
              >
                Dashboard
              </Link>
            </div>

            <div className="p-2 flex justify-end gap-10">
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
                      className="w-full pl-16 px-3 py-5 bg-transparent placeholder:text-slate-800 text-slate-600 md:text-3xl border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-cyan hover:border-slate-300 shadow-sm focus:shadow"
                      placeholder="Type here..."
                    />
                  </div>
                </div>
                <button
                  id="search_button"
                  className="rounded-md bg-green py-2 px-4 border border-transparent text-center md:text-3xl text-white transition-all shadow-md hover:shadow-lg focus:bg-green focus:shadow-none active:bg-leave hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Search
                </button>
              </div>
              <MenuItem />
            </div>
          </div>

          {/* <button
            class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
          >
            <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button> */}
        </div>
      </nav>
    </>
  );
};
export default AdminHeader;
