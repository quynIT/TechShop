import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserService from "../../services/UserService";
import Loading from "../../components/Loading/Loading";
import { MapPin, Users } from "lucide-react";
import avt from "../../assets/image/avt.jpg";

const InfoCustomer = () => {
  const { id } = useParams();
  const user = useSelector((state) => state?.user);
  const [stateUserDetailsStatic, setStateUserDetailsStatic] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
    role: "",
    createdAt: "",
  });

  const fetchGetDetailsUser = async (id) => {
    const token = user?.access_token;
    const res = await UserService.getDetailsUser(id, token);
    if (res?.data) {
      const userData = {
        name: res?.data.name,
        email: res?.data.email,
        phone: res?.data.phone,
        address: res?.data.address,
        avatar: res?.data.avatar,
        role: res?.data.role,
        createdAt: res?.data.createdAt,
      };
      setStateUserDetailsStatic(userData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGetDetailsUser(id);
    }
  }, [id]);

  return (
    <Loading isPending={false}>
      <div className="min-h-screen bg-gray-100">
        {/* Cover Image */}
        <div className="h-64 w-3/5 m-auto rounded-bl-2xl rounded-br-2xl bg-gradient-to-r from-blue-900 to-gray-900" />

        {/* Profile Container */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="-mt-24 sm:flex sm:items-end sm:space-x-5">
            <div className="relative">
              <img
                className="h-48 w-48 rounded-full ring-4 ring-white bg-white object-cover"
                src={stateUserDetailsStatic.avatar || avt}
                alt={stateUserDetailsStatic.name}
              />
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-400 ring-4 ring-white" />
            </div>

            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {stateUserDetailsStatic.name}
                  <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    ✓
                  </span>
                </h1>
                <p className="text-2xl text-gray-500">
                  {stateUserDetailsStatic.role || "N/A"}
                </p>
                <div className="mt-1 flex items-center text-2xl text-gray-500">
                  <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {stateUserDetailsStatic.address}
                </div>
              </div>

              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-2xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Following
                </button>
                <button className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-2xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Message
                </button>
              </div>
            </div>
          </div>

          {/* Account Info Area */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 ">
                Intro
              </h2>
              <p className="text-gray-600">
                {stateUserDetailsStatic.role &&
                  `Working as ${stateUserDetailsStatic.role}`}
              </p>
              <div className="text-lg">
                <p>
                  💰 <strong className="text-xl">Ví & Điểm thưởng</strong>
                  <br />- Số dư ví điện tử:{" "}
                  <strong className="font-semibold">1,500,000 VND</strong>
                  <br />- Điểm thưởng hiện tại: ⭐{" "}
                  <strong className="font-semibold">1,200 điểm</strong> (Quy
                  đổi: <strong className="font-semibold">120,000 VND</strong>)
                  <br />
                  <a href="#" className="text-blue-600 hover:underline">
                    💳 Nạp tiền vào ví
                  </a>{" "}
                  | ⭐{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Quy đổi điểm
                  </a>
                </p>
                <hr className="my-4 border-gray-300" />
                <p>
                  ❤️ <strong className="text-xl">Sản phẩm yêu thích</strong>
                  <ol className="list-decimal list-inside space-y-1 mt-2">
                    <li className="text-xl">Áo Hoodie Unisex - Màu Đen</li>
                    <li className="text-xl">
                      Tai nghe Bluetooth Sony WH-1000XM5
                    </li>
                    <li className="text-xl">
                      Đồng hồ thông minh Apple Watch Series 9
                    </li>
                  </ol>
                  🔍{" "}
                  <a href="#" className="text-blue-600 hover:underline text-xl">
                    Xem tất cả sản phẩm yêu thích
                  </a>
                </p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Account Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <label className="block text-2xl text-gray-600 font-semibold mb-2">
                      Name
                    </label>
                    <p className="text-gray-800 text-2xl">
                      {stateUserDetailsStatic.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2 text-2xl">
                      Email
                    </label>
                    <p className="text-gray-800 text-2xl">
                      {stateUserDetailsStatic.email || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-600 font-semibold mb-2 text-2xl">
                      Role
                    </label>
                    <p className="text-gray-800 text-2xl">
                      {stateUserDetailsStatic.role || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-gray-600 font-semibold mb-2 text-2xl">
                      Created Date
                    </label>
                    <p className="text-gray-800 text-2xl">
                      {stateUserDetailsStatic.createdAt || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-semibold mb-2 text-2xl">
                    Phone Number
                  </label>
                  <p className="text-gray-800 text-2xl">
                    {stateUserDetailsStatic.phone || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-2 text-2xl">
                    Address
                  </label>
                  <p className="text-gray-800 text-2xl">
                    {stateUserDetailsStatic.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default InfoCustomer;
