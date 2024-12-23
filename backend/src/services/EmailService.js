const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
var inlineBase64 = require("nodemailer-plugin-inline-base64");

const sendEmailCreateOrder = async (email, orderItems) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // email của bạn
      pass: process.env.MAIL_PASSWORD, // mật khẩu ứng dụng Gmail
    },
  });

  transporter.use("compile", inlineBase64({ cidPrefix: "somePrefix_" }));

  // Tạo giao diện hóa đơn với CSS inline
  let listItem = `
    <div style="font-family: Arial, sans-serif; margin: 20px auto; padding: 20px; max-width: 800px; border: 1px solid #f5a623; border-radius: 10px; background: #fff5e5; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
      <div style="text-align: center; color: #f57224; font-weight: bold; font-size: 24px; margin-bottom: 15px;">HÓA ĐƠN MUA HÀNG</div>
      <div style="text-align: center; color: #666; font-size: 14px; margin-bottom: 20px;">Cảm ơn quý khách đã mua hàng tại Tech Shop</div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <thead>
          <tr>
            <th style="background-color: #f57224; color: #fff; font-weight: bold; padding: 10px; border: 1px solid #ddd; text-align: left;">Tên sản phẩm</th>
            <th style="background-color: #f57224; color: #fff; font-weight: bold; padding: 10px; border: 1px solid #ddd; text-align: left;">Số lượng</th>
            <th style="background-color: #f57224; color: #fff; font-weight: bold; padding: 10px; border: 1px solid #ddd; text-align: left;">Giá (VND)</th>
            <th style="background-color: #f57224; color: #fff; font-weight: bold; padding: 10px; border: 1px solid #ddd; text-align: left;">Tổng giá (VND)</th>
          </tr>
        </thead>
        <tbody>`;

  let totalAmount = 0; // Biến để lưu tổng số tiền

  // Duyệt qua từng đơn hàng để thêm thông tin vào bảng
  orderItems.forEach((order, index) => {
    const totalPrice = order.amount * order.price;
    totalAmount += totalPrice;

    listItem += `
      <tr style="background-color: ${index % 2 === 0 ? "#ffe8cc" : "#fff"};">
        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${
          order.name
        }</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${
          order.amount
        }</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${order.price.toLocaleString()} VND</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${totalPrice.toLocaleString()} VND</td>
      </tr>`;
  });

  listItem += `
        </tbody>
      </table>
      <div style="text-align: right; font-size: 18px; font-weight: bold; color: #d35400; margin-top: 20px;">Tổng tiền phải thanh toán: ${totalAmount.toLocaleString()} VND</div>
      <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">Mọi thắc mắc xin liên hệ tổng đài 0329903471 để được hỗ trợ.</div>
    </div>
  `;

  // Gửi email với nội dung HTML và hình ảnh đính kèm
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // Địa chỉ gửi email
    to: email, // Địa chỉ nhận email
    subject: "Bạn đã đặt hàng thành công tại Tech Shop", // Tiêu đề email
    text: "Cảm ơn bạn đã đặt hàng tại Tech Shop.", // Nội dung dạng văn bản
    html: listItem, // Nội dung email dạng HTML
    attachments: orderItems.map((order) => ({
      filename: order.image.split("/").pop(), // Lấy tên tệp từ đường dẫn
      path: order.image, // Đường dẫn hình ảnh đính kèm
      cid: `somePrefix_${order.name}`, // Mã nhận dạng hình ảnh để hiển thị inline
    })),
  });

  console.log("Email sent: " + info.response);
};

module.exports = {
  sendEmailCreateOrder,
};
