import { verifyCodeService } from "@/services/verifyCode";

export async function POST(request) {
    const { email, code } = await request.json();
    try {
        const result = await verifyCodeService(email, code);
        return new Response(JSON.stringify(result), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message, status: 100010 }), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

}