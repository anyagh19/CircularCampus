import { decodeJwt } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function layout({children}: {children:React.ReactNode}) {
    const cookieStore =await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if(!accessToken){
        redirect('/auth/login')
    }
    try {
        const decoded = decodeJwt(accessToken)
    
        const role = decoded.role || decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    
        if(role === 'Student') return <div>{children}</div>
      
        if(role != 'Student') redirect('/unauthorized')
    } catch (error) {
        redirect('/auth/login')
    }
}

