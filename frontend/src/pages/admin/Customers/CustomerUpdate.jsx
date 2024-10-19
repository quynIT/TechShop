import { Settings } from "lucide-react";
import React from "react";
import CardProfile from "../../../components/CardComponent/CardProfile";
import CardSetting from "../../../components/CardComponent/CardSetting";

const CustomerUpdate = () => {
  return (
    <div className=" grid md:grid-cols-3 gap-6">
      <div className=" col-span-2 h-full">
        <div>
          <CardSetting />
        </div>

        <div class="relative rounded-lg bg-white shadow-lg border  px-6 py-6 my-6">
          <h4 class="block text-xl font-medium text-slate-800">Sign Up</h4>
          <p class="text-slate-500 font-light">
            Nice to meet you! Enter your details to register.
          </p>
          <div className="border border-red-700 grid grid-cols-2 gap-10 p-6">
            <div className="grid gap-2">
              <label class="block  text-sm text-slate-600">Curent</label>
              <div class="w-full">
                <div class="relative">
                  <input
                    type="password"
                    class="w-full pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Your password"
                  />
                </div>
              </div>

              <label class="block text-sm text-slate-600">Curent</label>
              <div class="w-full">
                <div class="relative">
                  <input
                    type="password"
                    class="w-full pl-3 pr-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Your password"
                  />
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm text-slate-600">Curent</label>
              <div class="w-full mt-2">
                <div class="relative">
                  <input
                    type="password"
                    class="w-full px-4 py-4 bg-transparent placeholder:text-slate-400 text-slate-600 text-[2rem] border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Your password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" col-span-1 h-full ">
        <div class=" bg-white shadow-sm border border-slate-200 rounded-lg  w-full">
          <div class="m-2.5 overflow-hidden rounded-md h-full flex justify-center items-center">
            <img
              class="w-full h-full object-cover"
              src="https://docs.material-tailwind.com/img/team-3.jpg"
              alt="profile-picture"
            />
          </div>
          <div class="p-4">
            <div class="flex items-center mb-2">
              <h6 class="text-slate-800 text-xl font-semibold">
                Wooden House, Florida
              </h6>
            </div>

            <p class="text-slate-600 leading-normal font-light">
              Enter a freshly updated and thoughtfully furnished peaceful home
              surrounded by ancient trees, stone walls, and open meadows.
            </p>
          </div>
          <div class="flex justify-center p-6 pt-2 gap-7">
            <button
              class="min-w-32  rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerUpdate;
