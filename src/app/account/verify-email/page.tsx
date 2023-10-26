'use client'

import { verifyJWT } from '@/app/libs/token'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react';

type Token = {
    email: string; 
    tokenCode: number;
    exp: number
}

const VerifyPage = () => {
    const { push, refresh } = useRouter();

    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    
    const [tokenValue, setTokenValue] = useState<Token | null>();
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [responseError, setResponseError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getValue = async () => {
        try {
            const tokenVal: Token = await verifyJWT(token as string);
            if (tokenVal) setTokenValue(tokenVal)
        } catch (error) {
            setResponseError("Verifikacioni token istekao, molim Vas pokusajte ponovo!")
        }
    }

    const validate = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:3000/api/auth/confirmEmail`, {
                tokenVal: tokenValue,
                token: token
            });
            setResponseMessage(res.data.message);
            
            if (res.data.redirect) {
                push('/login')
            }
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setResponseError(error.response.data.error)
        }
    }

    useEffect(() => {
        if (token) getValue()
    }, [])

    useEffect(() => {
        if (tokenValue) validate()
    }, [tokenValue])

    return (
        <div id='emailVerificationPage'>
            <h1>VerifyPage</h1>
            <div className='loading-wrapp'>
                {
                    loading && <h1>Loading...</h1>
                }
            </div>
            {
                responseMessage && 
                <div className='success-wrapper'>
                    {responseMessage}
                    <Link href={'/login'}>Prijavi se</Link>    
                </div>
            }
            {
                responseError && <div className='error-wrapper'>
                   <p>{responseError}</p>
                   <Link href={'/register'}>Registruj se</Link>
                </div>
            }
        </div>
    )
}

export default VerifyPage