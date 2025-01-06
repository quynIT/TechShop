const RevenueService = require("../services/RevenueService");

const getRevenue = async (req, res) => {
  try {
    const response = await RevenueService.getRevenue();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = {
  getRevenue,
};
