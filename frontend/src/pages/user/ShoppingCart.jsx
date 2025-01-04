import React from 'react';
import { Trash2, Plus, Minus, CreditCard, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeOrderProduct } from '../../redux/slides/orderSlide';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order)

  // Tăng số lượng sản phẩm
  const updateAmount = (product, newAmount) => {
    if (newAmount === 0) {
      // Nếu số lượng giảm xuống 0, xóa sản phẩm
      dispatch(removeOrderProduct({ idProduct: product }));
    } else if (newAmount > 0) {
      // Nếu số lượng > 0, tăng hoặc giảm số lượng
      if (newAmount > product.amount) {
        dispatch(increaseAmount({ idProduct: product.product }));
      } else {
        dispatch(decreaseAmount({ idProduct: product.product }));
      }
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (product) => {
    dispatch(removeOrderProduct({ idProduct: product.product }));
  };

  // Tính tổng tiền tạm tính
  const subtotal = order?.orderItems?.reduce(
    (sum, item) => sum + item.price * item.amount, 
    0
  );

  // Phí vận chuyển (miễn phí)
  const shipping = 0;

  // Tổng cộng
  const total = subtotal + shipping;

  return (
    <div className="max-w-8xl mx-auto p-12 bg-white shadow-xl rounded-2xl">
      <h1 className="text-5xl font-bold mb-12">Giỏ hàng của bạn</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2">
          {order?.orderItems?.map((item) => {
            return (
              <div key={item.product} className="flex items-center border-b py-8">
                <img src={item.image} alt={item.name} className="w-40 h-40 object-cover rounded-xl mr-8" />
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <p className="text-red-600 font-bold text-3xl mt-3">{item.price.toLocaleString()}VND</p>
                  <div className="flex items-center mt-6">
                    <button
                      onClick={() => updateAmount(item, item.amount - 1)}
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      <Minus size={24} />
                    </button>
                    <span className="mx-6 text-2xl">{item.amount}</span>
                    <button
                      onClick={() => updateAmount(item, item.amount + 1)}
                      className="bg-gray-200 p-3 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      <Plus size={24} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  <Trash2 size={36} />
                </button>
              </div>
            )
          })}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-8">Tổng giỏ hàng</h2>
            <div className="flex justify-between mb-6 text-xl">
              <span>Tạm tính:</span>
              <span>{subtotal?.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between mb-6 text-xl">
              <span>Phí vận chuyển:</span>
              <span className="text-green-600 font-semibold">Miễn phí</span>
            </div>
            <div className="flex justify-between font-semibold text-2xl border-t pt-6 mt-6">
              <span>Tổng cộng:</span>
              <span className="text-red-600">{total?.toLocaleString()}VND</span>
            </div>
            <button className="w-full bg-red-600 text-white py-5 rounded-xl font-semibold text-2xl mt-8 hover:bg-red-700 transition duration-300">
              <Link to="/order-success">Tiến hành đặt hàng</Link>
            </button>
            <div className="mt-8 text-lg text-gray-600">
              <div className="flex items-center mb-4">
                <Truck className="w-8 h-8 mr-4" />
                <span>Giao hàng miễn phí toàn quốc</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 mr-4" />
                <span>Thanh toán an toàn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;