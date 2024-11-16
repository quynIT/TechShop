import React from "react";

const SignIn = () => {
  return (
    <div className="h-screen  flex justify-center items-center">
      <div class="w-fit h-fit shadow-all rounded-sm border-5 border-gray-700">
        <div>
          <h6 className="text-center text-5xl font-bold py-4">Sign in</h6>
          <div className="btn-wrapper text-center px-6">
            <button
              className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-2xl ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
              Github
            </button>
            <button
              className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-2xl ease-linear transition-all duration-150"
              type="button"
            >
              <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
              Google
            </button>
          </div>
          <hr className="mt-6 border-b-1 mx-6 border-blueGray-300" />
        </div>

        <div className="px-6 py-4">
          <div class="w-full w-full max-w-lg min-w-[475px] py-6">
            <label class="block mb-2 text-3xl font-semibold text-slate-600">
              Email
            </label>
            <input
              id="signin_email"
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>

          <div class="w-full w-full min-w-[200px] py-6">
            <label class="block mb-2 text-3xl font-semibold text-slate-600">
              Password
            </label>
            <input
              id="signin_password"
              type="password"
              class="w-full px-4 py-5 bg-transparent placeholder:text-slate-400 text-slate-600 text-3xl border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>

          <div class="inline-flex items-center py-4">
            <label
              class="flex items-center cursor-pointer relative"
              for="checkbox"
            >
              <input
                type="checkbox"
                class="peer h-9 w-9 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                id="checkbox"
              />
              <span class="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              class="cursor-pointer ml-2 text-slate-600 text-3xl"
              for="check-2"
            >
              Remember Me
            </label>
          </div>

          <div className="flex justify-center items-center py-4">
            <button
              id="signin_button"
              data-ripple-light="true"
              class="rounded-md w-full font-bold bg-teal-900 py-5 border border-transparent text-center text-3xl text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:bg-teal-500 hover:bg-teal-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Sign in
            </button>
          </div>

          <p class="flex justify-center my-10 mx-6 text-3xl text-slate-600">
            Don&apos;t have an account?
            <a
              href="#signup"
              class="ml-1 text-3xl font-semibold text-slate-700 underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
