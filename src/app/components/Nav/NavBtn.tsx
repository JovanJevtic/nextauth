'use client'

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"

interface NavBarBtnProps {
   
}

const NavBtn: React.FunctionComponent<NavBarBtnProps> = ({  }) => {
    const { data: session, status } = useSession()

    return(
        status === "authenticated" ? 
            <button
                onClick={() => {signOut()}}
                id='nav-btn'
                style={{ backgroundColor: '#96160e' }}
            >Odjavi se</button>
            :
            <div style={{ display: 'flex' }}>
                <Link
                    id='nav-btn'
                    href={'/login'}
                >Prijavi se</Link>
                <Link 
                    href={'/register'}
                    id='nav-btn'
                    style={{ backgroundColor: '#0e2b96', marginLeft: '10px' }}
                >
                    Registruj se
                </Link>
            </div>
        
    )
}  

export default NavBtn