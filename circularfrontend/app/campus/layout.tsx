import { decodeJwt } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// 1. MUST BE 'export default async function'
export default async function CampusLayout({ children }: { children: React.ReactNode }) {
    
    // 2. Access cookies (await is required in Next.js 15+)
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        redirect('/auth/login');
    }

    try {
        const decoded: any = decodeJwt(token);
        
        // Match the claim key from your C# backend
        const role = decoded.role || 
                     decoded.Role || 
                     decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role !== 'Campus') {
            redirect('/unauthorized');
        }

        return <>{children}</>;
        
    } catch (error) {
        console.error("JWT Security Guard Error:", error);
        redirect('/auth/login');
    }
}