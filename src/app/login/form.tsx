'use client'

import { signIn } from "next-auth/react";
import { useState } from "react"
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'

type LoginFormData = {
    email: string;
    password: string;
}

const Form = () => {
    const { push, refresh } = useRouter();
    const params = useSearchParams();
    const callbackUrl = params.get("callbackUrl")

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: callbackUrl ? true : false,
            callbackUrl: callbackUrl as string
        }) 
        if (!response?.error) {
            push('/');
            refresh();
        }
    }

    return (
       <>
        <form onSubmit={login}>
            <h1>Login</h1>
            <input 
                type="email" 
                name="email"
                placeholder="email.."
                onChange={handleChange}
                className="text-black"
            />
            <input 
                type="password"
                name="password"
                placeholder="password..."
                onChange={handleChange}
                className="text-black"
            />
            <button type="submit">Login</button>
        </form>
        <button onClick={() => {signIn("google")}}>Google</button>
        </>
    )
}

export default Form