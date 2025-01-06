const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authUserMiddleWare,
  authMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/create/:id", OrderController.createOrder);
router.get("/get-all-order/:id", OrderController.getAllOrderDetails);
router.get("/get-details-order/:id", OrderController.getDetailsOrder);
router.delete("/cancel-order/:id", OrderController.cancelOrderDetails);
router.put("/update/:id", OrderController.updateOrderDetails);
router.get("/get-all-order", OrderController.getAllOrder);
router.put("/update-status/:id", OrderController.updatePaymentStatus);
router.get("/search", OrderController.searchOrdersByName);
module.exports = router;
