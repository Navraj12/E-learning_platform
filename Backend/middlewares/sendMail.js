const { createTransport } = require('nodemailer')

const sendMail = async(email, subject, data) => {
    const transport = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.Gmail,
            pass: process.env.Password,
        },
    });

    const html = ` <div class="min-h-screen flex items-center justify-center bg-gray-50">
<div class="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
    <h1 class="text-2xl font-bold text-red-600 mb-4">OTP Verification</h1>
    <p class="text-gray-600 mb-6">
    Hello ${data.name} your (One-Time Password) for your account verification is.
    </p>
    <div class="text-4xl font-mono font-bold text-indigo-600 mb-8">
    ${data.otp}
    </div>
</div>
</div>
            `;


    await transport.sendMail({
        from: process.env.Gmail,
        to: email,
        subject,
        html
    })

}

export default sendMail