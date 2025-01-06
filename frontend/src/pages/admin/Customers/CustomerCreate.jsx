import React, { useEffect, useState } from "react";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as UserService from "../../../services/UserService";
import { message } from "antd";
import { getBase64 } from "../../../utils";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const CustomerCreate = () => {
  // State để validate các trường nhập
  const [errors, setErrors] = useState({});
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    phone: "",
    address: "",
    avatar: "",
  });

  const mutation = useMutationHooks((data) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      role,
      phone,
      address,
      avatar,
    } = data;

    const res = UserService.signupUser({
      name,
      email,
      password,
      confirmPassword,
      role,
      phone,
      address,
      avatar,
    });
    return res;
  });

  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success("Account created successfully");
      setStateUser({
        name: "",
        email: "",
        password: "",
        role: "user",
        phone: "",
        address: "",
        avatar: "",
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError, data]);

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async (event) => {
    const files = event.target.files; // Lấy danh sách file từ input
    if (!files || files.length === 0) {
      console.error("No files provided.");
      return;
    }

    const file = files[0]; // Lấy file đầu tiên
    const preview = await getBase64(file); // Chuyển file thành Base64

    // Cập nhật state với hình ảnh preview
    setStateUser({
      ...stateUser,
      avatar: preview,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!stateUser.name.trim()) {
      newErrors.name = "User name cannot be blank";
    } else if (stateUser.name.length < 2) {
      newErrors.name = "User name must be at least 2 characters";
    } else if (stateUser.name.length > 50) {
      newErrors.name = "User name cannot exceed 50 characters";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!stateUser.email.trim()) {
      newErrors.email = "Email cannot be blank";
    } else if (!emailRegex.test(stateUser.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password
    if (!stateUser.password.trim()) {
      newErrors.password = "Password cannot be blank";
    } else if (stateUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (stateUser.password.length > 20) {
      newErrors.password = "Password must not exceed 20 characters";
    }

    // Validate confirm password
    if (!stateUser.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (stateUser.password !== stateUser.confirmPassword) {
      newErrors.confirmPassword = "Confirmation password does not match";
    }

    // Validate phone number
    const phoneRegex = /^(0[1-9][0-9]{8,9})$/;
    if (!stateUser.phone.trim()) {
      newErrors.phone = "Phone number cannot be blank";
    } else if (!phoneRegex.test(stateUser.phone)) {
      newErrors.phone = "Invalid phone number (must start with 0 and have 9-10 digits)";
    }

    // Validate address
    if (!stateUser.address.trim()) {
      newErrors.address = "Address cannot be blank";
    } else if (stateUser.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    } else if (stateUser.address.length > 200) {
      newErrors.address = "Address cannot exceed 200 characters";
    }

    // Validate avatar
    if (!stateUser.avatar) {
      newErrors.avatar = "Please select user avatar";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onFinish = () => {
    if (validateForm()) {
      mutation.mutate(stateUser);
    } else {
      message.error("Please fill in the information completely and accurately");
    }
  };

  return (
    <Loading isPending={isPending}>
      <div className=" grid md:grid-cols-3 gap-6">
        <div className="relative col-span-2">
          <div className="absolute top-0 left-0 w-full">
            <div className=" h-full w-full shadow-lg rounded-lg-lg bg-white ">
              <div className=" rounded-lg-t bg-white px-6 py-6">
                <div className="text-center flex justify-between">
                  <h4 className="text-blueGray-700 text-5xl font-bold">
                    Customer Account
                  </h4>
                  <Link to="/admin/CustomerList">
                    <button
                      className="bg-yellow-500 text-white active:bg-yellow-300 font-semibold text-3xl p-5  rounded-lg-lg shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear   "
                      type="button"
                    >
                      View All
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
                            Name
                          </label>
                          <input
                            type="text"
                            className={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.name ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                              } rounded-md px-5 py-5`}
                            placeholder="Your user name"
                            value={stateUser.name}
                            onChange={handleOnChange}
                            name="name"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-2xl mt-2">{errors.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="w-full px-4">
                        <div className="relative w-full ">
                          <label
                            className="block font-sans text-slate-600 text-3xl font-semibold mb-5"
                            htmlFor="grid-password"
                          >
                            Password
                          </label>
                          <input
                            type="text"
                            className={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.password ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                              } rounded-md px-5 py-5`}
                            placeholder="Your user password"
                            value={stateUser.password}
                            onChange={handleOnChange}
                            name="password"
                          />
                          {errors.password && (
                            <p className="text-red-500 text-2xl mt-2">{errors.password}</p>
                          )}
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
                            Email Address
                          </label>

                          <input
                            type="email"
                            className={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.email ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                              } rounded-md px-5 py-5`}
                            placeholder="Your user email address"
                            value={stateUser.email}
                            onChange={handleOnChange}
                            name="email"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-2xl mt-2">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="w-full px-4">
                        <div className="relative w-full ">
                          <label
                            className="block font-sans text-slate-600  text-3xl font-semibold mb-5"
                            htmlFor="grid-password"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="text"
                            className={`w-full bg-transparent placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                              } rounded-md px-5 py-5`}
                            placeholder="Your user confirm password"
                            value={stateUser.confirmPassword}
                            onChange={handleOnChange}
                            name="confirmPassword"
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-2xl mt-2">{errors.confirmPassword}</p>
                          )}
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
                          className="block mb-5  text-slate-600  text-3xl "
                          htmlFor="grid-password"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg
                              className="w-10 h-10 text-gray-500 dark:text-gray-400"
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
                            className={`w-full bg-transparent pl-16 placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.phone ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                              } rounded-md px-5 py-5`}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="Your user phone number"
                            required
                            value={stateUser.phone}
                            onChange={handleOnChange}
                            name="phone"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-2xl mt-2">{errors.phone}</p>
                        )}
                      </div>

                      {/* <div className="w-full">
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
                    </div> */}
                    </div>
                    <div className="w-full px-4">
                      <label
                        className="block mb-5  text-slate-600  text-3xl font-semibold"
                        htmlFor="grid-password"
                      >
                        Address
                      </label>
                      <div class="relative">
                        <div class="absolute inset-y-0 p-4 start-0 top-0 flex items-center pointer-events-none ">
                          <i className="fas fa-map-marker-alt mr-2 text-4xl text-slate-600"></i>
                        </div>
                        <input
                          type="text"
                          className={`w-full bg-transparent pl-16 placeholder:text-slate-400 outline-none text-slate-700 text-3xl border ${errors.phone ? 'border-red-500' : 'border-slate-300 focus:border-cyan'
                            } rounded-md px-5 py-5`}
                          placeholder="Your user address"
                          value={stateUser.address}
                          onChange={handleOnChange}
                          name="address"
                        />
                      </div>
                      {errors.address && (
                        <p className="text-red-500 text-2xl mt-2">{errors.address}</p>
                      )}
                      <div className="relative w-full mb-3">
                      </div>
                    </div>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </form>
                {/* button */}
                <div className="flex justify-between items-cente bg-white p-10">
                  <button
                    type="button"
                    className="text-slate-800 border border-cyan focus:bg-gradient-to-r from-cyan to-lime-500 hover:bg-gradient-to-br hover:text-white focus:text-white shadow-lg shadow-green-500/50 font-medium rounded-lg text-3xl px-5 py-5"
                    onClick={onFinish}
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-10">
          <img
            className="h-96 bg-white w-full object-cover object-center"
            src={
              stateUser?.avatar ||
              "https://docs.material-tailwind.com/img/team-3.jpg"
            }
            alt="Customer"
          />

          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class={`flex flex-col items-center justify-center w-full h-64 border-2 ${errors.avatar ? 'border-red-500' : 'border-gray-300'
                } border-dashed rounded-lg cursor-pointer bg-gray-50`}
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
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                onChange={handleOnchangeAvatar}
                name="avatar"
              />
            </label>
          </div>
          {errors.avatar && (
            <p className="text-red-500 text-2xl mt-2">{errors.avatar}</p>
          )}
        </div>
      </div>
    </Loading>
  );
};

export default CustomerCreate;