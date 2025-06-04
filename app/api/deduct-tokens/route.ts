import { NextResponse } from 'next/server';
import deductTokens from '@/lib/actions/deductTokens';

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    await deductTokens(amount);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
