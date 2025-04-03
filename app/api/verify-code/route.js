import pool from '@/lib/db';

export async function POST(request) {
    const { email, code } = await request.json();
    if (!email || !code) {
        return new Response(JSON.stringify({ message: 'Missing required parameters', status: 100010  }), { status: 200 });
    }

    try {
        // 查询数据库中的验证码
        const sql = 'SELECT code, expires_at FROM verification_codes WHERE email = ?';
        const [rows] = await pool.execute(sql, [email]);
        if (rows.length === 0) {
            return new Response(JSON.stringify({ message: 'Verification code not found', status: 100001  }), { status: 200 });

        }

        const record = rows[0];
        if (record.code !== code || new Date(record.expires_at) < new Date()) {
            return new Response(JSON.stringify({ message: 'Invalid or expired verification code', status: 100002  }), { status: 200 });
        }

        // 验证通过后，删除验证码记录
        const deleteSql = 'DELETE FROM verification_codes WHERE email = ?';
        await pool.execute(deleteSql, [email]);
        return new Response(JSON.stringify({ message: 'Verification code verified successfully', status: 100000 }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ message: 'Internal server error', status: 100003 }), { status: 200 });
    }
}