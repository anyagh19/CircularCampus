import { NextRequest, NextResponse } from 'next/server';
import { decodeJwt } from 'jose';

// api/campus-code/route.ts (or wherever it's defined)
export async function GET(request: NextRequest) {
    const token = request.cookies.get('accessToken')?.value;
    // console.log('Received request for campus code. Access token:', token); // 
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded: any = decodeJwt(token);
        const campusCode = decoded.unique_name;   // ← correct claim
        // console.log('Decoded campus code:', campusCode);
        if (!campusCode) {
            return NextResponse.json({ error: 'Campus code not found in token' }, { status: 400 });
        }
        return NextResponse.json({ campusCode });
    } catch (err) {
        console.error('Token decode error:', err);
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}