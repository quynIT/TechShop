import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { message } from "antd";
import { updateUser } from "../../redux/slides/userSlide";
import Loading from "../../components/Loading/Loading";
import { getBase64 } from "../../utils";

const Settings = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [role, setRole] = useState("");

  // State để hiển thị bên phải
  const [displayInfo, setDisplayInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser(id, access_token, rests);
  });

  const dispatch = useDispatch();
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
    setCreatedAt(user?.createdAt);
    setRole(user?.role);

    // Cập nhật display info khi user thay đổi
    setDisplayInfo({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnchangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnchangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnchangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnchangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const preview = await getBase64(file); // Chuyển file thành base64
        setAvatar(preview);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      access_token: user?.access_token,
      name,
      email,
      phone,
      address,
      avatar,
    });
  };

  return (
    <Loading isPending={isPending}>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <div className=" h-full w-full shadow-lg rounded-lg-lg bg-white ">
            <div className=" rounded-lg-t bg-white px-6 py-6">
              <div className="text-center flex justify-between">
                <h4 className="text-blueGray-700 text-5xl font-bold">
                  My account
                </h4>
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
                          id="name"
                          type="text"
                          className="border px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  border-slate-300 text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                          placeholder={name}
                          onChange={handleOnchangeName}
                        />
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full ">
                        <label
                          className="block  font-sans text-slate-600  text-3xl font-semibold mb-5"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="text"
                          className="border border-slate-300 px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                          placeholder="Hidden"
                          readOnly
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
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="border border-slate-300 px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white   rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                          placeholder={email}
                          onChange={handleOnchangeEmail}
                        />
                      </div>
                    </div>

                    <div className="w-full px-4">
                      <div className="relative w-full ">
                        <label
                          className="block font-sans text-slate-600  text-3xl font-semibold mb-5"
                          htmlFor="grid-password"
                        >
                          Role
                        </label>
                        <input
                          type="text"
                          className="border border-slate-300 px-5 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear"
                          placeholder={role}
                          readOnly
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
                        Phone Number
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
                          id="phone"
                          aria-describedby="helper-text-explanation"
                          class="bg-white border border-gray-300 text-slate-600 shadow text-3xl rounded-lg focus:border-cyan focus:outline-none block w-full px-16 py-5"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder={phone}
                          onChange={handleOnchangePhone}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <label
                        className="block  mb-5 text-slate-600  text-3xl font-semibold"
                        htmlFor="grid-password"
                      >
                        Created Date
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
                          placeholder={createdAt}
                          readOnly
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
                      <div class="absolute inset-y-0 mt-14 p-4 start-0 top-0 flex items-center pointer-events-none ps-3.5">
                        <i className="fas fa-map-marker-alt mr-2 text-4xl text-slate-600"></i>
                      </div>
                      <input
                        id="address"
                        type="text"
                        className="border border-slate-300 px-14 py-5 placeholder-blueGray-300 text-slate-600 bg-white  rounded-lg  text-3xl shadow focus:outline-none focus:border-cyan w-full ease-linear   "
                        placeholder={address}
                        onChange={handleOnchangeAddress}
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </form>
              {/* Button */}
              <div className="flex justify-between items-center mt-10 bg-white p-10">
                <button
                  type="button"
                  className="text-slate-800 border border-cyan focus:bg-gradient-to-r from-cyan to-lime-500 hover:bg-gradient-to-br hover:text-white focus:text-white shadow-lg shadow-green-500/50 font-medium rounded-lg text-3xl px-5 py-5"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative p-10 h-full bg-white w-full shadow-xl rounded-lg ">
            <div className="px-6">
              <div className=" justify-center">
                <div className="w-full px-4 flex justify-center">
                  {/* image */}
                  <div className="relative">
                    <img
                      alt="tania andrew"
                      src={
                        avatar ||
                        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                      }
                      class="relative block justify-center h-96 cursor-pointer object-cover object-center"
                    />

                    <div class="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
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
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
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
                          maxCount={1}
                          name="avatar"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border border-leave mt-10" />
              <div className="text-center mt-12 text-3xl">
                <h3 className="text-3xl font-semibold leading-normal  text-blueGray-700 mb-2">
                  {displayInfo.name}
                </h3>
                <div className="text-3xl leading-normal mt-5 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-4xl text-blueGray-400"></i>{" "}
                  {displayInfo.address}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-4xl text-blueGray-400"></i>
                  {displayInfo.email}
                </div>
                <div className="mb-2 text-blueGray-600 mt-5">
                  <i className="fas fa-university mr-2 text-4xl text-blueGray-400"></i>
                  {displayInfo.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Settings;
