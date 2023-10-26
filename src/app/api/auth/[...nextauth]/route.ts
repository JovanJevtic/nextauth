import prisma from '@/app/libs/prismadb'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { compare } from 'bcryptjs'

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findUnique({ where: { email: credentials?.email } }) 
                
                if (user && await compare(credentials?.password as string, user.password)) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    } as any
                } else {
                    return null;
                }
            },
        }),
    ]
})

export { handler as POST, handler as GET }