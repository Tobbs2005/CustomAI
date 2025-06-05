import getTokenCount from "@/lib/actions/getTokenCount";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const tokenCount = await getTokenCount();

        return NextResponse.json({ success: true, token_count: tokenCount });
    } catch (err: any) {
        return NextResponse.json(
            { success: false, error: err.message },
            { status: 500 }
        );
    }
}
