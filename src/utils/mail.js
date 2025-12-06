import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  // Configure mailgen by setting a theme and your product info
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Task Manager",
      link: "https://mailgen.js/",
    },
  });

  var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
  var emailHtml = mailGenerator.generate(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: "mail.taskmanager@example.com", // sender address
    to: options.email,
    subject: options.subject,
    text: emailText, // plain‑text body
    html: emailHtml, // HTML body
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error("Email failed ", error);
  }
};

const emailVerificationMailGenContent = (username, vereificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to App! We're very excited to have you on board.",
      action: {
        instructions: "To get started with our App, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: vereificationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

const forgotPasswordMailGenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got a requrest to reset your password.",
      action: {
        instructions: "To change the password, please click the button",
        button: {
          color: "#22BC66", // Optional action button color
          text: "reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};

// Example usage:
// sendMail({
//   email: user.email,
//   subject: "aaa",
//   mailGenContent: emailVerificationMailGenContent(username, ``),
// });
