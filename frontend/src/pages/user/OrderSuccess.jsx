import React from 'react';
import { CheckCircle, Package, Truck } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h2>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã đặt hàng tại Thế Giới Di Động</p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Mã đơn hàng:</span>
            <span className="text-sm font-semibold text-gray-800">#TGD123456</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Tổng cộng:</span>
            <span className="text-sm font-semibold text-gray-800">9.999.000 ₫</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Package className="h-5 w-5 text-blue-500 mr-3" />
            <span className="text-sm text-gray-700">Đơn hàng đang được xử lý</span>
          </div>
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-blue-500 mr-3" />
            <span className="text-sm text-gray-700">Dự kiến giao hàng trong 2-3 ngày</span>
          </div>
        </div>
        
        <button className="mt-8 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
          Theo dõi đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;