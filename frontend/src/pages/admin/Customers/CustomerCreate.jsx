import { Settings } from "lucide-react";
import React from "react";
import CardSetting from "../../../components/CardComponent/CardSetting";


const CustomerCreate = () => {
  return (
    <div className=" grid md:grid-cols-3 gap-6">
      <div className="relative col-span-2">
        <div className="absolute top-0 left-0 w-full">
          <CardSetting />
        </div>
      </div>
      <div className=" col-span-1 h-full ">
        <div class=" bg-white shadow-sm border border-slate-200 rounded-lg p-6 w-full">
          <h4 className="text-slate-600  text-3xl  font-bold  ">Upload File</h4>
          <div class="py-6 overflow-hidden rounded-md h-full flex justify-center items-center">
            <img
              class="w-full h-full object-cover"
              src="https://docs.material-tailwind.com/img/team-3.jpg"
              alt="profile-picture"
            />
          </div>
          <div class="flex justify-center p-6 pt-2 ">
            <button
              class="flex items-center rounded-md bg-gradient-to-tr gap-5 from-lime-500 to-cyan p-5 border border-transparent text-center text-3xl text-white transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:from-leave hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-10 h-10 "
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                  clip-rule="evenodd"
                />
              </svg>
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerCreate;
