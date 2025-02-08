const { createTransport } = require('nodemailer');

const sendMail = async(email, subject, data) => {
    try {
        const transport = createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use TLS (not SSL)
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>OTP Verification</title>
        </head>
        <body style="background-color: #f4f4f4; font-family: Arial, sans-serif; padding: 20px; text-align: center;">
            <div style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 400px; margin: auto;">
                <h1 style="color: #e3342f; font-size: 24px; margin-bottom: 10px;">OTP Verification</h1>
                <p style="color: #555; font-size: 16px;">Hello <strong>${data.name}</strong>, your One-Time Password (OTP) for account verification is:</p>
                <p style="font-size: 30px; color: #6b46c1; font-weight: bold; margin: 20px 0;">${data.otp}</p>
                <p style="color: #777; font-size: 12px;">This OTP is valid for 5 minutes. Do not share it with anyone.</p>
            </div>
        </body>
        </html>
        `;

        const mailOptions = {
            from: `"E-learning Support" <${process.env.GMAIL}>`, // Consistent sender
            to: email,
            subject: subject,
            html: html,
        };

        const info = await transport.sendMail(mailOptions);
        console.log(`Email sent successfully to ${email}: ${info.messageId}`);
        return info;
    } catch (error) {
        console.error(`Failed to send email to ${email}:`, error.message);
        throw new Error("Unable to send email. Please try again later.");
    }
};

module.exports = sendMail;