import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useMutationHooks } from "../../../hooks/useMutationHook";
import * as UserService from "../../../services/UserService";
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
  // State dùng cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Số lượng khách hàng mỗi trang

  const user = useSelector((state) => state?.user);

  const {
    isPending: isPending,
    data: users = [],
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await UserService.getAllUser(user.access_token);
      return res?.data.filter((user) => user.role === "user") || [];
    },
    staleTime: 10 * 60 * 1000, // 10 phút
    cacheTime: 15 * 60 * 1000, // 15 phút
    retry: 2,
    retryDelay: 1000,
  });

  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const mutationDeleteMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = UserService.deleteManyUser(ids, token);
    return res;
  });

  const {
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
    data: dataDeleted,
  } = mutationDelete;
  const {
    isSuccess: isSuccessDeletedManyUser,
    isError: isErrorDeletedManyUser,
    data: dataDeletedManyUser,
  } = mutationDeleteMany;

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success("User deleted successfully!");
      refetch(); // Refresh nguời dùng sau khi xóa
    } else if (isErrorDeleted) {
      message.error("An error occurred while deleting the user!");
    }
  }, [isSuccessDeleted, refetch]);

  useEffect(() => {
    if (isSuccessDeletedManyUser && dataDeletedManyUser?.status === "OK") {
      message.success("User deleted successfully!");
      refetch(); // Refresh người dùng sau khi xóa
    } else if (isErrorDeletedManyUser) {
      message.error("An error occurred while deleting the user!");
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
      mutationDeleteMany.mutate({
        ids: selectedUsers,
        token: user?.access_token,
      });
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user._id));
    }
  };

  const processedUsers = useMemo(() => {
    // Kiểm tra và lọc dữ liệu an toàn
    let filteredUsers = (users || [])
      .filter(user => user && user.role === 'user')
      .filter(user =>
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      );

    // Sắp xếp an toàn
    return filteredUsers.sort((a, b) => {
      const nameA = a?.name?.trim() || "";
      const nameB = b?.name?.trim() || "";

      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)  // Sắp xếp tăng dần
        : nameB.localeCompare(nameA); // Sắp xếp giảm dần
    });
  }, [users, searchTerm, sortOrder]);

  // Cập nhật giá trị khi người dùng nhập vào ô tìm kiếm
  const handleSearchInputChange = (e) => {
    setTempSearchTerm(e.target.value);
  };

  // Cập nhật searchTerm khi nhấn nút tìm kiếm
  const handleSearchClick = () => {
    setSearchTerm(tempSearchTerm); // Chỉ cập nhật searchTerm khi nhấn nút Search
  };

  // Render an toàn từng dòng
  const renderUserRow = (user) => {
    if (!user) return null;
    return (
      <tr key={user._id} className="hover:bg-gray-50">
        <td className="w-10 px-4 py-8">
          <input
            type="checkbox"
            className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 rounded"
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleSelectUser(user._id)}
          />
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <img
            src={user.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"}
            alt={user.name || "User"}
            className="w-16 h-16 rounded-full object-cover"
            onError={(e) => {
              if (e.target.src !== '/default-avatar.png') {
                e.target.src = '/default-avatar.png';
              }
            }}
          />
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-3xl antialiased font-normal leading-normal text-blue-gray-900">
            {user.name || 'Unknown'}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-3xl antialiased font-normal leading-normal text-blue-gray-900">
            {user.email}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-3xl antialiased font-normal leading-normal text-blue-gray-900">
            {user.phone || 'No phone number yet'}
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex space-x-2">
            {/* edit button */}
            <Link to={`/admin/CustomerUpdate/${user._id}`}>
              <button type="button">
                <FaEdit className="inline hover:bg-white w-16 h-16 p-2 active:bg-gray-50 rounded-xl hover:shadow-xl text-yellow-400" />

              </button>
            </Link>
            <button
              onClick={() => handleDeleteClick(user)}
              className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4"
            >
              <svg
                class="inline w-16 h-16 p-2 text-red-400 active:bg-gray-50 hover:bg-white hover:shadow-xl rounded-xl "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    );
  };

  // Tính toán số trang
  const totalPages = useMemo(() => {
    return Math.ceil(processedUsers.length / itemsPerPage);
  }, [processedUsers]);

  // Phân trang dữ liệu
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return processedUsers.slice(startIndex, endIndex);
  }, [processedUsers, currentPage]);

  // Hàm xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Render phân trang
  const renderPaginationButtons = () => {
    const buttons = [];

    // Nút Previous
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 min-w-9 min-h-9 text-3xl font-normal ${currentPage === 1
          ? 'text-slate-300 cursor-not-allowed'
          : 'text-slate-500 hover:bg-slate-50 hover:border-slate-400'
          } bg-white border border-slate-200 rounded transition duration-200 ease`}
      >
        Prev
      </button>
    );

    // Các nút số trang
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 min-w-9 min-h-9 text-3xl font-normal ${currentPage === i
            ? 'text-white bg-slate-800 border-slate-800'
            : 'text-slate-500 bg-white border-slate-200 hover:bg-slate-50'
            } border rounded hover:border-slate-400 transition duration-200 ease`}
        >
          {i}
        </button>
      );
    }

    // Nút Next
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 min-w-9 min-h-9 text-3xl font-normal ${currentPage === totalPages
          ? 'text-slate-300 cursor-not-allowed'
          : 'text-slate-500 hover:bg-slate-50 hover:border-slate-400'
          } bg-white border border-slate-200 rounded transition duration-200 ease`}
      >
        Next
      </button>
    );

    return buttons;
  };

  // UseEffect để reset trang khi thay đổi bộ lọc
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder]);

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
                        placeholder="Search for customers..."
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
                class={`flex select-none items-center justify-center rounded-lg bg-red-600 py-2 px-4 text-center font-sans text-xl font-semibold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:bg-red-600 active:shadow-none disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none
                ${selectedUsers.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  }`}
                type="button"
                onClick={handleDeleteManyUser}
                disabled={selectedUsers.length === 0}
              >
                <svg
                  class=" w-10 h-10 text-white  "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg>
                Delete all
              </button>

              {/* Add member */}
              <Link to="/admin/CustomerCreate">
                <button
                  class="flex select-none items-center justify-end gap-3 rounded-lg bg-yellow-500 py-4 px-4 text-center  font-sans text-xl font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
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
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map(renderUserRow)
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-4xl p-10 text-gray-500">
                      {searchTerm 
                        ? `No customers found matching "${searchTerm}"` 
                        : "No customers"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Loading>
        {/* Phân trang */}
        <div class="flex items-center justify-end p-4 border-t border-blue-gray-50">
          <div class="flex space-x-1">
            {renderPaginationButtons()}
          </div>
        </div>
      </div>
      {/* Modal xác nhận xóa */}
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