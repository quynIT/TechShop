import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

const CancelOrderInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = [
    'Tôi muốn thay đổi sản phẩm',
    'Tìm thấy giá rẻ hơn ở nơi khác',
    'Thời gian giao hàng quá lâu',
    'Đổi ý, không muốn mua nữa',
    'Lý do khác'
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-yellow-400 p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Hủy đơn hàng</h2>
        <X className="cursor-pointer" size={24} />
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 mb-4">Vui lòng chọn lý do hủy đơn hàng:</p>
        
        <div className="relative">
          <div
            className="border border-gray-300 rounded-md p-2 flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedReason || 'Chọn lý do'}</span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          
          {isOpen && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
              {reasons.map((reason, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedReason(reason);
                    setIsOpen(false);
                  }}
                >
                  {reason}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 mt-4"
          rows="4"
          placeholder="Nhập lý do cụ thể (nếu có)"
        ></textarea>
        
        <div className="mt-4 flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
            Trở về
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            Hủy đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderInterface;