
import { verifyUserService } from '@/services/userLogin.js';
import { verifyCodeService } from '@/services/verifyCode.js';
export async function POST(request) {
    const { email, password, code } = await request.json();
    // 检查请求参数是否完整
    if (!email || !password || !code) {
        return new Response(JSON.stringify({ message: '邮箱、密码或验证码不能为空', status: 100010 }), { status: 200 });
    }
    // 验证验证码
    const verifyCodeResponse = await verifyCodeService(email, code);
    if( verifyCodeResponse.status !== 100000) {
        return new Response(JSON.stringify(verifyCodeResponse), { status: 200 });
    }
    // 验证用户登录
    const verifyUserResponse = await verifyUserService(email, password);
    if (verifyUserResponse.status !== 100000) {
        return new Response(JSON.stringify(verifyUserResponse), { status: 200 });
    }
    return new Response(JSON.stringify(verifyCodeResponse), { status: 200 });
}