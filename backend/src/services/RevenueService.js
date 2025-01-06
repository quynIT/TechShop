const Product = require("../models/ProductModel");
const User = require("../models/UserModel");
const Order = require("../models/OrderProduct");

const getRevenue = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalProducts = await Product.countDocuments();
      const totalUsers = await User.countDocuments();
      const totalOrders = await Order.countDocuments();
      const totalStaffUsers = await User.countDocuments({ role: "staff" });

      resolve({
        status: "OK",
        message: "Success",
        data: {
          totalProducts,
          totalUsers,
          totalOrders,
          totalStaffUsers,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getRevenue,
};
