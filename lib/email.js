import nodemailer from 'nodemailer';
// 创建邮件发送器
const transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_AUTHORIZATION_CODE
    }
});

// 发送邮件
async function sendMail({to, subject, text}) {
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to,
        subject,
        text
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
export {
    transporter,
    sendMail
}