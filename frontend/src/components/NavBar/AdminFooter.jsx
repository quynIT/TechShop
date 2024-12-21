import React from "react";

const AdminFooter = () => {
  return (
    <>
      <footer class="bg-white shadow w-full dark:bg-gray-800">
        <hr></hr>
        <div class="w-full mx-auto max-w-screen-xl p-6 md:flex md:items-center md:justify-between">
          <span class="text-2xl text-gray-700 text-start dark:text-gray-400">
            2024 TechShop
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-700 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default AdminFooter;
