const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const EmailService = require("../services/EmailService");

const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    const {
      orderItems,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
      user,
      isPaid,
      paidAt,
      email,
    } = newOrder;

    try {
      // Kiểm tra số lượng hàng tồn kho
      const promises = orderItems.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product,
            countInStock: { $gte: order.amount },
          },
          {
            $inc: {
              countInStock: -order.amount,
              selled: +order.amount,
            },
          },
          { new: true }
        );
        if (productData) {
          return {
            status: "OK",
            message: "SUCCESS",
          };
        } else {
          return {
            status: "OK",
            message: "ERR",
            id: order.product,
          };
        }
      });

      // Chờ tất cả các promises xử lý xong
      const results = await Promise.all(promises);
      const newData = results && results.filter((item) => item.id);

      if (newData.length) {
        // Nếu có sản phẩm thiếu hàng, trả về thông báo lỗi
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        resolve({
          status: "ERR",
          message: `San pham voi id: ${arrId.join(",")} khong du hang`,
        });
      } else {
        // Tạo đơn hàng mới
        const createdOrder = await Order.create({
          orderItems,
          shippingAddress: {
            fullName,
            address,
            city,
            phone,
          },
          paymentMethod,
          itemsPrice,
          shippingPrice,
          totalPrice,
          user: user,
          isPaid,
          paidAt,
          email,
        });

        // Nếu đơn hàng được tạo thành công, gửi email và trả về ID đơn hàng
        if (createdOrder) {
          console.log("email", email);
          await EmailService.sendEmailCreateOrder(email, orderItems);
          resolve({
            status: "OK",
            message: "success",
            orderId: createdOrder._id, // Trả về ID của đơn hàng vừa tạo
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

// const deleteManyProduct = (ids) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             await Product.deleteMany({ _id: ids })
//             resolve({
//                 status: 'OK',
//                 message: 'Delete product success',
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const getOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      // console.log('e', e)
      reject(e);
    }
  });
};

const cancelOrderDetails = async (orderId) => {
  try {
    // Kiểm tra đơn hàng có tồn tại không
    const order = await Order.findById(orderId).populate("orderItems.product");
    if (!order) {
      return { status: "ERR", message: "Order not found" };
    }

    // Duyệt qua các sản phẩm trong đơn hàng
    const results = await Promise.all(
      order.orderItems.map(async (item) => {
        const product = item.product;

        // Cập nhật số lượng tồn kho và số lượng đã bán
        const updatedProduct = await Product.findOneAndUpdate(
          {
            _id: product._id, // ID sản phẩm
            selled: { $gte: item.amount }, // Kiểm tra số lượng đã bán
          },
          {
            $inc: {
              countInStock: item.amount, // Hoàn trả lại số lượng vào kho
              selled: -item.amount, // Giảm số lượng đã bán
            },
          },
          { new: true }
        );

        if (!updatedProduct) {
          throw new Error(
            `Product with ID ${product._id} not found or insufficient stock.`
          );
        }
        return updatedProduct;
      })
    );

    // Xóa đơn hàng
    await Order.findByIdAndDelete(orderId);

    return {
      status: "OK",
      message: "Order has been canceled successfully.",
      data: results,
    };
  } catch (error) {
    console.error(error);
    return { status: "ERR", message: error.message };
  }
};
const updatePaymentStatus = async (orderId, isPaid) => {
  try {
    // Kiểm tra nếu trạng thái thanh toán không hợp lệ
    if (!["pending", "paid", "cancel"].includes(isPaid)) {
      return {
        status: "ERR",
        message:
          "Invalid payment status. It should be 'pending', 'paid', or 'cancel'.",
      };
    }

    // Cập nhật trạng thái thanh toán cho đơn hàng
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { isPaid, paidAt: isPaid === "paid" ? new Date() : null },
      { new: true }
    );

    if (!updatedOrder) {
      return { status: "ERR", message: "Order not found" };
    }

    // Gửi email nếu trạng thái thanh toán được cập nhật thành 'paid'
    if (isPaid === "paid") {
      const userEmail = updatedOrder.email; // Lấy email từ trường email trong đơn hàng
      const orderItems = updatedOrder.orderItems; // Lấy danh sách sản phẩm trong đơn hàng

      if (userEmail) {
        await EmailService.sendEmailUpdateOrder(userEmail, orderItems);
      }
    }

    return {
      status: "OK",
      message: `Order payment status updated to ${isPaid}`,
      data: updatedOrder,
    };
  } catch (error) {
    console.error(error);
    return { status: "ERR", message: "Something went wrong." };
  }
};

const updateOrderDetails = async (orderId, updatedData) => {
  try {
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      return { status: "ERR", message: "Order not found" };
    }

    if (updatedData.orderItems && updatedData.orderItems.length > 0) {
      const promises = updatedData.orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with ID ${item.product} not found.`);
        }

        const diffAmount =
          item.amount -
          (existingOrder.orderItems.find(
            (oItem) => oItem.product.toString() === item.product
          )?.amount || 0);

        if (product.countInStock < diffAmount) {
          throw new Error(`Insufficient stock for product ID ${item.product}.`);
        }

        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { countInStock: -diffAmount, selled: diffAmount } },
          { new: true }
        );
      });

      await Promise.all(promises);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: updatedData },
      { new: true }
    );

    return {
      status: "OK",
      message: "Order updated successfully.",
      data: updatedOrder,
    };
  } catch (error) {
    console.error(error);
    return { status: "ERR", message: error.message };
  }
};
module.exports = {
  updatePaymentStatus,
};
const getAllOrder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "OK",
        message: "Success",
        data: allOrder,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getOrderDetails,
  cancelOrderDetails,
  getAllOrder,
  updatePaymentStatus,
  updateOrderDetails,
};
