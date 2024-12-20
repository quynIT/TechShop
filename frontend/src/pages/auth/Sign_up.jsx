import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleOnchangePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleOnchangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    console.log('sign-up', email, password, confirmPassword)
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div class="w-fit h-fit shadow-all rounded-sm border-5 border-gray-700">
          <div>
            <h6 className="text-center text-5xl font-bold py-4">Sign up</h6>
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

          <div className="px-6 py-10">
            {/* <div className="flex gap-4 ">
              <div class="w-full max-w-sm min-w-[200px]">
                <label class="block mb-2 text-3xl font-semibold text-slate-600">
                  Fullname
                </label>
                <input
                  id="fullname"
                  class=" w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
                  placeholder="Type here..."
                  value={fullname} onChange={handleOnchangeFullname}
                />
              </div>
              <div class="w-full max-w-sm min-w-[200px]">
                <label class="block mb-2 text-3xl font-semibold text-slate-600">
                  Lastname
                </label>
                <input
                  id="lastname"
                  class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
                  placeholder="Type here..."
                />
              </div>
            </div> */}

            <div class="w-full w-full min-w-[200px] py-6">
              <label class="block mb-2 text-3xl font-semibold text-slate-600">
                Email
              </label>
              <input
                id="email"
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-3xl border border-slate-200 rounded-md px-4 py-5 transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
                placeholder="Type here..."
                value={email} onChange={handleOnchangeEmail}
              />
            </div>

            <div class="w-full w-full min-w-[200px] py-6">
              <label class="block mb-2 text-3xl font-semibold text-slate-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                class="w-full px-4 py-5 bg-transparent placeholder:text-slate-400 text-slate-600 text-3xl border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
                placeholder="Type here..."
                value={password} onChange={handleOnchangePassword}
              />
              <p class="flex items-start mt-2 text-xl text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5 mr-1.5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
                Use at least 8 characters, one uppercase, one lowercase and one
                number.
              </p>
            </div>

            <div class="w-full w-full min-w-[200px] py-6">
              <label class="block mb-2 text-3xl font-semibold text-slate-600">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                type="password"
                class="w-full px-4 py-5 bg-transparent placeholder:text-slate-400 text-slate-600 text-3xl border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-teal-700 hover:border-teal-500 shadow-sm focus:shadow"
                placeholder="Confirm password"
                value={confirmPassword} onChange={handleOnchangeConfirmPassword}
              />
            </div>
          </div>

          <div className="flex justify-center items-center px-6">
            <button
              id="sign_up"
              data-ripple-light="true"
              class="rounded-md w-full font-bold bg-teal-900 py-5 px-6 border border-transparent text-center text-3xl text-white transition-all shadow-md hover:shadow-lg focus:shadow-none active:bg-teal-500 hover:bg-teal-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </div>

          <p class="flex justify-center my-10 mx-6 text-3xl text-slate-600">
            You have an account?
            <a
              href=""
              class="ml-1 text-3xl font-semibold text-slate-700 underline"
              onClick={handleNavigateSignIn}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default SignUp;
