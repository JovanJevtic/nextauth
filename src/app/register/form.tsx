'use client'

import { FormEvent, useState } from "react"

type RegisterFormData = {
    email: string;
    password: string;
}

const Form = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch(`/api/auth/register`, {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        console.log(response, '<== form res');
    }

    return (
        <form onSubmit={register}>
            <h1>Register</h1>
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
            <button type="submit">Register</button>
        </form>
    )
}

export default Form