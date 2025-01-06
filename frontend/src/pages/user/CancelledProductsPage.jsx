import React from 'react';
import { ShoppingBag, Calendar, X } from 'lucide-react';
import iphone1 from '../../assets/image/iphone1.jpg';
import iphone2 from '../../assets/image/iphone2.jpg';
import iphone3 from '../../assets/image/iphone3.jpg';
const CancelledProductsPage = () => {
  // Mảng chứa dữ liệu mẫu về các sản phẩm đã hủy
  const cancelledProducts = [
    {
      id: 1,
      name: 'iPhone 13 Pro',
      price: '28.990.000đ',
      image: iphone1,
      cancelDate: '15/10/2023',
      reason: 'Tìm thấy giá rẻ hơn ở nơi khác',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S21',
      price: '20.990.000đ',
      image: iphone2,
      cancelDate: '12/10/2023',
      reason: 'Đổi ý, không muốn mua nữa',
    },
    {
      id: 3,
      name: 'iPad Air 2022',
      price: '15.990.000đ',
      image: iphone3,
      cancelDate: '10/10/2023',
      reason: 'Thời gian giao hàng quá lâu',
    },
    {
      id: 4,
      name: 'iPad Air 2022',
      price: '15.990.000đ',
      image: iphone3,
      cancelDate: '10/10/2023',
      reason: 'Thời gian giao hàng quá lâu',
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sản phẩm đã hủy</h1>
      
      {cancelledProducts.map((product) => (
        <div key={product.id} className="bg-white shadow-md rounded-lg mb-4 p-4">
          <div className="flex items-start">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-red-600 font-medium">{product.price}</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <Calendar size={16} className="mr-1" />
                <span>Ngày hủy: {product.cancelDate}</span>
              </div>
              <div className="flex items-start mt-2 text-sm text-gray-600">
                <X size={16} className="mr-1 mt-1 flex-shrink-0" />
                <span>Lý do hủy: {product.reason}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {cancelledProducts.length === 0 && (
        <div className="text-center py-8">
          <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Bạn chưa có sản phẩm nào đã hủy.</p>
        </div>
      )}
    </div>
  );
};

export default CancelledProductsPage;