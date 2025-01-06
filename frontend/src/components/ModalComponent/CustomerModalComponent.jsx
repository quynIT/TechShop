import React from "react";

const CustomerModalComponent = ({ isOpen, onClose, onConfirm, customerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-5xl font-semibold mb-4">Are you sure?</h2>
        <p className="text-3xl py-10">Do you want to delete the customer <strong>{customerName}</strong>?</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-4 py text-3xl bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-3xl bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModalComponent;