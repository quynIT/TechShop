import React from 'react';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-14 rounded-xl shadow-lg max-w-4xl w-full">
        <div className="text-center mb-12">
          <CheckCircle className="mx-auto h-28 w-28 text-green-500 mb-8" />
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Đặt hàng thành công!</h2>
          <p className="text-2xl text-gray-600">Cảm ơn bạn đã đặt hàng tại Thế Giới Di Động</p>
        </div>
        
        <div className="border-t border-b border-gray-200 py-10 mb-10">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-xl font-medium text-gray-600">Mã đơn hàng:</span>
              <span className="text-xl font-semibold text-gray-800 ml-2">#TGD123456</span>
            </div>
            <div>
              <span className="text-xl font-medium text-gray-600">Tổng cộng:</span>
              <span className="text-xl font-semibold text-gray-800 ml-2">9.999.000 ₫</span>
            </div>
            <div>
              <span className="text-xl font-medium text-gray-600">Ngày đặt hàng:</span>
              <span className="text-xl font-semibold text-gray-800 ml-2">29/09/2024</span>
            </div>
            <div>
              <span className="text-xl font-medium text-gray-600">Phương thức thanh toán:</span>
              <span className="text-xl font-semibold text-gray-800 ml-2">Thẻ tín dụng</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-10 mb-12">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-blue-700 mb-6">Trạng thái đơn hàng</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Package className="h-10 w-10 text-blue-500 mr-5" />
                <span className="text-xl text-gray-700">Đơn hàng đang được xử lý</span>
              </div>
              <div className="flex items-center">
                <Truck className="h-10 w-10 text-blue-500 mr-5" />
                <span className="text-xl text-gray-700">Dự kiến giao hàng trong 2-3 ngày</span>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-green-700 mb-6">Thông tin thanh toán</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <CreditCard className="h-10 w-10 text-green-500 mr-5" />
                <span className="text-xl text-gray-700">Đã thanh toán đầy đủ</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-10 w-10 text-green-500 mr-5" />
                <span className="text-xl text-gray-700">Giao dịch thành công</span>
              </div>
            </div>
          </div>
        </div>
        
        <button className="w-full bg-blue-600 text-white py-5 px-6 rounded-lg text-2xl font-semibold hover:bg-blue-700 transition duration-300">
          Theo dõi đơn hàng
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;