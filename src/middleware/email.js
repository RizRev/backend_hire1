const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports = async (email, subject, url, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: "Revan",
      to: email,
      subject: `"Thanks For Registering your Account"`,
      html: `"Hi! This is your verif click <a href=https://dead-ruby-swordfish-fez.cyclic.app/users/verif/${email}/${subject}> Here</a>"`,
      //   html: "<div>
      // 				<h1>Email Confirmation</h1>
      //                 <h2>Hello ${name}</h2>
      //                 <p>Thank you for join us. Please confirm your email by clicking on the following link</p>
      //                 <a href='${url}'> Click here</a>
      // 				atau masuk ke link ${url}
      //                 </div>",
    });
    console.log("email sent successfully");
    return "email sent successfully";
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return "email not sent!";
  }
};
