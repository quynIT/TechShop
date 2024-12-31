import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as UserService from '../../../services/UserService'
import { useQuery } from "@tanstack/react-query";
import { message } from "antd";
import Loading from "../../../components/Loading/Loading";
import CustomerModalComponent from "../../../components/ModalComponent/CustomerModalComponent";

const CustomerList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  // Dùng cho việc sắp xếp tên sản phẩm
  const [sortOrder, setSortOrder] = useState("asc");
  // State cho từ khóa tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  // State tạm thời cho từ khóa tìm kiếm
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  // State để cập nhật các lựa chọn theo ô vuông
  const [selectedUsers, setSelectedUsers] = useState([]);

  const user = useSelector((state) => state?.user);

  const mutationDelete = useMutationHooks(
    (data) => {
      const { id, token } = data;
      const res = UserService.deleteUser(id, token);
      return res;
    }
  );

  const mutationDeleteMany = useMutationHooks(
    (data) => {
      const { token, ...ids } = data;
      const res = UserService.deleteManyUser(ids, token);
      return res;
    }
  );

  const { isSuccess: isSuccessDeleted, isError: isErrorDeleted, data: dataDeleted } = mutationDelete;
  const { isSuccess: isSuccessDeletedManyUser, isError: isErrorDeletedManyUser, data: dataDeletedManyUser } = mutationDeleteMany;

  const { isPending: isPending, data: users = [], error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await UserService.getAllUser(user.access_token);
      return res.data.filter(user => user.role === "user") || [];
    },
  });

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success("Xóa người dùng thành công!");
      refetch(); // Refresh nguời dùng sau khi xóa
    } else if (isErrorDeleted) {
      message.error("Có lỗi xảy ra khi xóa người dùng!");
    }
  }, [isSuccessDeleted, refetch]);

  useEffect(() => {
    if (isSuccessDeletedManyUser && dataDeletedManyUser?.status === 'OK') {
      message.success("Xóa người dùng thành công!");
      refetch(); // Refresh người dùng sau khi xóa
    } else if (isErrorDeletedManyUser) {
      message.error("Có lỗi xảy ra khi xóa người dùng!");
    }
  }, [isSuccessDeletedManyUser, refetch]);

  // Hàm xử lý xác nhận xóa
  const handleDeleteConfirm = async () => {
    mutationDelete.mutate({ id: userToDelete._id, token: user?.access_token });
    setIsModalOpen(false); // Đóng modal sau khi xác nhận xóa
  };

  // Hàm xử lý việc mở modal với người dùng cần xóa
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const handleDeleteManyUser = () => {
    if (selectedUsers.length > 0) {
      mutationDeleteMany.mutate({ ids: selectedUsers, token: user?.access_token });
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user._id));
    }
  };

  //Hàm sắp xếp tên người dùng
  const sortedUsers = [...(users || [])].sort((a, b) => {
    // Kiểm tra xem a.name và b.name có tồn tại không
    const nameA = a?.name || '';
    const nameB = b?.name || '';

    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB); // Sắp xếp tăng dần
    } else {
      return nameB.localeCompare(nameA); // Sắp xếp giảm dần
    }
  });

  // Lọc người dùng theo tên dựa trên từ khóa tìm kiếm
  const filteredUsers = sortedUsers.filter(user =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  );

  // Cập nhật giá trị khi người dùng nhập vào ô tìm kiếm
  const handleSearchInputChange = (e) => {
    setTempSearchTerm(e.target.value);
  };

  // Cập nhật searchTerm khi nhấn nút tìm kiếm
  const handleSearchClick = () => {
    setSearchTerm(tempSearchTerm); // Chỉ cập nhật searchTerm khi nhấn nút Search
  };

  return (
    <div class="relative w-full text-gray-700 shadow-md  rounded-xl bg-white">
      <div className="p-10">
        <div class="relative overflow-hidden  text-gray-700 bg-clip-border">
          <div class=" items-center  justify-between gap-8 mb-8">
            <div>
              <h4 class="block font-sans text-4xl antialiased font-medium leading-snug tracking-normal text-slate-800">
                Customers list
              </h4>
              <p class="block mt-1 font-sans text-3xl antialiased font-normal leading-relaxed text-gray-700">
                See information about all customers
              </p>
            </div>
            <div className=" flex justify-start gap-10 pt-10">
              <div class="w-full gg-red max-w-lg min-w-[200px] justify-start">
                <div class="relative">
                  <select class="w-full bg-transparent placeholder:text-slate-400 shadow-md text-slate-700 text-3xl border border-slate-300 rounded px-5 pr-8 py-4 transition duration-300 ease focus:outline-none focus:border-cyan hover:border-green shadow-green/30 focus:shadow-md appearance-none cursor-pointer">
                    <option value="brazil">Brazil</option>
                    <option value="bucharest">Bucharest</option>
                    <option value="london">London</option>
                    <option value="washington">Washington</option>
                  </select>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.2"
                    stroke="currentColor"
                    class="w-12 ml-1 absolute top-3.5 right-2.5 text-slate-700"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </div>
              </div>

              <div class="relative flex-1 w-full sm:w-[40rem] min-w-[200px] ">
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
                        className="w-full pl-16 px-3 py-4 bg-transparent shadow-md shadow-green/30 placeholder:text-slate-700 text-slate-600 md:text-3xl border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-cyan hover:border-green focus:shadow"
                        placeholder="Type here..."
                        value={tempSearchTerm}
                        onChange={handleSearchInputChange}
                      />
                    </div>
                  </div>
                  <button
                    id="search_button"
                    className="flex select-none items-center justify-end gap-3 rounded-lg  py-2 px-4 text-center font-sans text-xl font-bold uppercase border border-slate-300 text-slate-700 shadow-md shadow-gray-900/10 
                            hover:border-green active:border-leave focus:border-cyan focus:text-white 
                            transition-all hober:border-green hover:shadow-lg hover:shadow-gray-900/20 focus:bg-green focus:shadow-leave active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handleSearchClick}
                  >
                    Search
                  </button>
                </div>
              </div>
              {/* delete many button */}
              <button
                class={`flex select-none items-center justify-center rounded-lg bg-red-500 py-2 px-4 text-center font-sans text-xl font-semibold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none
                ${selectedUsers.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                type="button"
                onClick={handleDeleteManyUser}
                disabled={selectedUsers.length === 0}
              >
                <svg
                  class="w-10 h-10 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                  />
                </svg>
                Delete
              </button>


              {/* Add member */}
              <Link to="/admin/CustomerCreate">
                <button
                  class="flex select-none items-center justify-end gap-3 rounded-lg bg-yellow-500 py-2 px-4 text-center  font-sans text-xl font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    stroke-width="2"
                    class="w-10 h-10"
                  >
                    <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                  </svg>
                  Add Customer
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Table */}
        <Loading isPending={isPending}>
          <div class="mt-6 px-0 ">
            <table class="w-full text-left border-2 shadow-md table-auto min-w-max">
              <thead className="bg-gray-100">
                <tr className="">
                  <th scope="col" class="p-4">
                    <div class="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        class="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSelectAll}
                        checked={selectedUsers.length === users.length}
                      />
                      <label for="checkbox-all-search" class="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th class="px-6 py-3 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-3xl antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                      Customer Image
                    </p>
                  </th>
                  <th class="px-6 py-3 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-3xl antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                      Customer Name
                    </p>
                    <button
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                      className="text-sm text-blue-500 hover:underline px-2 py-1 border border-blue-500 rounded-md transition-colors hover:bg-blue-500 hover:text-white"
                    >
                      ({sortOrder === "asc" ? "Ascending" : "Descending"})
                    </button>
                  </th>
                  <th class="px-6 py-3 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-3xl antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                      Email
                    </p>
                  </th>
                  <th class="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-3xl antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                      Phone
                    </p>
                  </th>
                  <th class="px-6 py-3 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
                    <p class="flex items-center justify-between gap-2 font-sans text-3xl antialiased font-bold leading-none text-blue-gray-900 opacity-70">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50">
                    <td class="w-10 p-10">
                      <div class="flex items-center">
                        <input
                          id={`checkbox-${user._id}`}
                          type="checkbox"
                          class="w-4  p-10 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => handleSelectUser(user._id)}
                        />
                        <label htmlFor={`checkbox-${user._id}`} className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>

                    <td class="p-4  border-b border-blue-gray-50 ">
                      <div class="flex items-center gap-10">
                        <img
                          src={user.avatar}
                          alt={user.name || "User"}
                          class="relative inline-block w-20 !rounded-full object-cover object-center"
                        />
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex flex-col">
                        <p class="block font-sans text-3xl antialiased font-normal leading-normal text-blue-gray-900">
                          {user.name || "N/A"}
                        </p>
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <div class="flex flex-col">
                        <p class="block font-sans text-3xl antialiased font-normal leading-normal text-blue-gray-900">
                          {user.email}
                        </p>
                      </div>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      <p class="block font-sans text-3xl antialiased font-normal leading-normal text-blue-gray-900">
                        {user.phone || "N/A"}
                      </p>
                    </td>
                    <td class="p-4 border-b border-blue-gray-50">
                      {/* <button
                        class="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            class="w-4 h-4"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                          </svg>
                        </span>
                      </button> */}
                      {/* edit button */}
                      <Link to={`/admin/CustomerUpdate/${user._id}`}>
                        <button
                          class="flex select-none items-center justify-end  rounded-lg bg-yellow-500 py-2 px-4 text-center  font-sans text-2xl font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                        >
                          <svg
                            class="w-10 h-10 me-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
                            />
                          </svg>
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Loading>
        {/* page split */}
        <div class="flex items-center justify-between p-4 border-t border-blue-gray-50">
          <div class="text-3xl text-slate-500">
            Showing <b>1-5</b> of 45
          </div>
          <div class="flex space-x-1">
            <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              Prev
            </button>
            <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
              1
            </button>
            <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              2
            </button>
            <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              3
            </button>
            <button class="px-3 py-1 min-w-9 min-h-9 text-3xl font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
              Next
            </button>
          </div>
        </div>
      </div>
      {/* Modal for Delete Confirmation */}
      <CustomerModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        customerName={userToDelete?.name}
      />
    </div>
  );
};

export default CustomerList;