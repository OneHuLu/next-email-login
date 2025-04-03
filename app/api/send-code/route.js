import pool from '../../../lib/db';
import { sendMail } from '../../../lib/email';

export async function POST(request) {
    const { email } = await request.json();
    if (!email) {
        return new Response(JSON.stringify({ message: 'Email is required', status: 200 }));
    }

    // 生成6位随机验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // 有效时间  5分钟后过期
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    try {
        // 存储验证码到 MySQL，使用 REPLACE 以防止重复 email 记录
        const sql = `REPLACE INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`;
        await pool.execute(sql, [email, code, expiresAt]);
        // 发送邮件
        await sendMail({
            to: email,
            subject: '验证码',
            text: `您的验证码是：${code}`
        });

        return new Response(JSON.stringify({ message: 'Verification code sent', status: 200  }));

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ message: 'Database error', status: 200  }));
    }

}