const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  const { email } = req.body;
  console.log("maal ", email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gurkaransingh197@gmail.com",
      pass: "qkyttdsrjktmtqww",
    },
  });

  const mailOptions = {
    from: "gurkaransingh197@gmail.com",
    to: email,
    subject: "Welcome to Lucky Roll!",
    text: `Hi there,

Thank you for registering with Lucky Roll! We're excited to have you on board.

Explore the exciting features of Lucky Roll and test your luck today.

Best regards,
The Lucky Roll Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
