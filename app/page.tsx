"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div>
      {/* 登录页面 */}
      <button onClick={() => router.push("/page/login")}>登录页面</button>
      {/* 注册页面 */}
      <button onClick={() => router.push("/page/register")}>注册页面</button>
    </div>
  );
}
