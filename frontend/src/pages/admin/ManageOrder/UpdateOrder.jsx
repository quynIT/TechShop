import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateOrderAdmin() {
  const { id } = useParams();
  const navigate = useNavigate(); // Để chuyển hướng sau khi cập nhật thành công
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Thêm state thông báo thành công

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/order/get-details-order/${id}`
        );
        const result = await response.json();
        if (result.status === "OK") {
          setOrder(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Error fetching order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/order/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order), // Gửi toàn bộ dữ liệu đơn hàng đã cập nhật
        }
      );
      const result = await response.json();
      if (result.status === "OK") {
        setSuccessMessage("Order updated successfully!"); // Cập nhật thông báo thành công

        // Chờ 2 giây để người dùng đọc thông báo
        setTimeout(() => {
          // Điều hướng đến trang chi tiết đơn hàng sau khi cập nhật thành công
          navigate(`/staff/edit/${id}`);
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error updating order.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full lg:w-12/12 px-4">
      <div className="h-full w-full shadow-lg rounded-lg bg-blueGray-100">
        <div className="rounded-t bg-white px-6 py-6">
          <div className="text-center flex">
            <Button className="bg-emerald-500" href="/staff/list">
              Back
            </Button>
            <h6 className="text-blueGray-700 text-5xl font-bold ml-[36%]">
              Update Order
            </h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {/* Hiển thị thông báo thành công nếu có */}
          {successMessage && (
            <div className="bg-lime-500 text-white p-4 rounded mb-4">
              {successMessage}
            </div>
          )}

          <h6 className="text-blueGray-400 text-xl mt-3 mb-6 font-bold uppercase">
            Shipping Information
          </h6>

          <form onSubmit={handleUpdateOrder}>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={order.shippingAddress.fullName}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        shippingAddress: {
                          ...order.shippingAddress,
                          fullName: e.target.value,
                        },
                      })
                    }
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={order.shippingAddress.phone}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        shippingAddress: {
                          ...order.shippingAddress,
                          phone: e.target.value,
                        },
                      })
                    }
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={order.shippingAddress.address}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        shippingAddress: {
                          ...order.shippingAddress,
                          address: e.target.value,
                        },
                      })
                    }
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Invoice creation time
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={new Date(order.createdAt).toLocaleDateString()}
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Payment Status
                  </label>
                  <select
                    value={order.isPaid}
                    onChange={(e) =>
                      setOrder({
                        ...order,
                        isPaid: e.target.value,
                      })
                    }
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  >
                    <option value="pending">pending</option>
                    <option value="paid">paid</option>
                    <option value="cancel">cancel</option>
                  </select>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-xl mt-3 mb-6 font-bold uppercase">
              Order Items
            </h6>
            <div className="flex border-b py-4 font-semibold text-blueGray-700">
              <div className="flex-1 text-left">Product Name</div>
              <div className="flex-1 text-center">Quantity</div>
              <div className="flex-1 text-right">Price</div>
            </div>

            {order.orderItems.map((item, index) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex-1 text-xl text-blueGray-700">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const updatedItems = [...order.orderItems];
                      updatedItems[index].name = e.target.value;
                      setOrder({ ...order, orderItems: updatedItems });
                    }}
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
                <div className="flex-1 text-xl text-blueGray-700 text-center">
                  <input
                    type="number"
                    value={item.amount}
                    onChange={(e) => {
                      const updatedItems = [...order.orderItems];
                      updatedItems[index].amount = e.target.value;
                      setOrder({ ...order, orderItems: updatedItems });
                    }}
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
                <div className="flex-1 text-xl text-blueGray-700 text-right">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => {
                      const updatedItems = [...order.orderItems];
                      updatedItems[index].price = e.target.value;
                      setOrder({ ...order, orderItems: updatedItems });
                    }}
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
            ))}

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded ml-[47%]"
              >
                Update Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
