import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailOrderAdmin() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-wrap mt-6">
      <div className="w-full lg:w-8/12 px-4">
        <div className="h-full w-full shadow-lg rounded-lg bg-blueGray-100">
          <div className="rounded-t bg-white px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-3xl font-bold">
                Order Details
              </h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <h6 className="text-blueGray-400 text-xl mt-3 mb-6 font-bold uppercase">
              Shipping Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={order.shippingAddress.fullName}
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
                    readOnly
                    value={order.shippingAddress.phone}
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
                    readOnly
                    value={order.shippingAddress.address}
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
                    value={new Date(order.createdAt).toLocaleDateString()} // Lấy ngày theo định dạng locale
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
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

            {order.orderItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex-1 text-xl text-blueGray-700">
                  {item.name}
                </div>
                <div className="flex-1 text-xl text-blueGray-700 text-center">
                  {item.amount}
                </div>
                <div className="flex-1 text-xl text-blueGray-700 text-right">
                  {item.price} VND
                </div>
              </div>
            ))}

            <hr className="mt-6 border-b-1 border-blueGray-300" />

            <h6 className="text-blueGray-400 text-xl mt-3 mb-6 font-bold uppercase">
              Payment Information
            </h6>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={order.paymentMethod}
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Total Price
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${order.totalPrice} VND`}
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-black text-xl font-semibold mb-2">
                    Status
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={order.isPaid}
                    className="border-0 px-5 py-5 bg-white text-black text-xl rounded shadow focus:outline-none w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative h-full bg-white w-full shadow-xl rounded-lg ">
          <div className="px-6">
            <div className=" justify-center">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  <img
                    alt="tania andrew"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                    class="relative block justify-center h-16 cursor-pointer rounded-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {order.shippingAddress.fullName}
              </h3>
              <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                {order.shippingAddress.address}
              </div>
              <div className="mb-2 text-blueGray-600 mt-10 text-2xl font-bold">
                <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                {order.shippingAddress.phone}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
