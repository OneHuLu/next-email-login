import { verifyUser } from '@/lib/api/userLogin.js';

const verifyUserService = async (email, password) => {
    // 验证用户登录
    const result = await verifyUser(email, password);
    if (result.length > 0) {
        return { message: '登录成功', status: 100000 };
    } else {
        return { message: '邮箱、密码或验证码错误', status: 100011 };
    }
}

export {
    verifyUserService
}