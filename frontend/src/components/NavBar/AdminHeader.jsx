import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading/Loading";
import { UserOutlined } from "@ant-design/icons";

const AdminHeader = () => {
  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const accountToggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  // Hàm xử lý chuyển hướng đến trang profile
  const handleProfileClick = () => {
    navigate("/admin/settings");
    setIsOpen(false); // Đóng dropdown menu sau khi chuyển hướng
  }

  return (
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
                    className="w-full pl-16 px-3 py-5 bg-transparent placeholder:text-slate-800 text-slate-600 md:text-3xl border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-cyan hover:border-slate-300 shadow-md focus:shadow"
                    placeholder="Type here..."
                  />
                </div>
              </div>
              <button
                id="search_button"
                className="rounded-md bg-white text-black  py-2 px-4 border border-slate-300 text-center md:text-3xl hover:text-white transition-all shadow-md hover:shadow-lg focus:bg-green focus:text-white focus:shadow-none active:bg-leave hover:bg-green active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Search
              </button>
            </div>
            <Loading isPending={loading}>
              {userAvatar ? (
                <img
                  alt="avatar"
                  src={userAvatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"}
                  class="relative block justify-center w-20 h-20 cursor-pointer rounded-full object-cover object-center lg:mx-10"
                  data-popover-target="profile-menu"
                  onClick={accountToggle}
                />
              ) : (
                <UserOutlined style={{ fontSide: "30px" }} />
              )}

              {isOpen && (
                <ul
                  role="menu"
                  data-popover="profile-menu"
                  data-popover-placement="bottom"
                  class="absolute right-8 z-10 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-3 shadow-lg mt-6 focus:outline-none"
                >
                  <li
                    role="menuitem"
                    class="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                    onClick={handleProfileClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-8 h-8 text-slate-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <p class="text-slate-800 text-2xl font-medium ml-2">My Profile</p>
                  </li>
                  <li
                    role="menuitem"
                    class="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-8 h-8 text-slate-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <p class="text-slate-800 text-2xl font-medium ml-2">Edit Profile</p>
                  </li>

                  <hr class="my-2 border-slate-200" role="menuitem" />
                  <li
                    role="menuitem"
                    class="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="w-8 h-8 text-slate-400"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M19 10a.75.75 0 0 0-.75-.75H8.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 19 10Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <p class="text-slate-800 text-2xl font-medium ml-2">Sign Out</p>
                  </li>
                </ul>
              )}
            </Loading>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;