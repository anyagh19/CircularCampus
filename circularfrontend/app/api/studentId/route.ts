import { decodeJwt } from "jose";
import { NextRequest } from "next/server";

export  async function GET(request: NextRequest){
    try {
        const token = request.cookies.get('accessToken')?.value;
        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }
        const decoded = decodeJwt(token)
        console.log(decoded)
        const studentId = decoded.nameid; 
        console.log('Decoded student ID:', studentId);
        if (!studentId) {
            return new Response(JSON.stringify({ error: 'Student ID not found in token' }), { status: 400 });
        }
        return new Response(JSON.stringify({ studentId }), { status: 200 });
    } catch (error) {
        console.error('Error fetching student ID:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
}