import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { verifyJWT } from "@/app/libs/token";

export const POST = async (request: NextRequest) => {
    try {
        const {
            tokenVal, token
        } = await request.json();
        const emailVerificationToken = await prisma.emailVerificationToken.findUnique({ where: { token: token } })

        const userExists = await prisma.user.findUnique({ where: { email: tokenVal.email } })
        if (userExists) {
            return NextResponse.json({ message: 'Korisnik je vec verifikovan...', redirect: true }, { status: 200 })
        }
        
        if (!emailVerificationToken) {
            return NextResponse.json({ error: 'Verifikacijski token je istekao...' }, { status: 400 })
        }
        
        if (emailVerificationToken?.expiresAt < new Date(Date.now())) {
            await prisma.emailVerificationToken.delete({ where: { id: emailVerificationToken.id } })
            return NextResponse.json({ error: 'Verifikacijski token je istekao...' }, { status: 400 })
        }

        const decoded = await verifyJWT<{ email: string; tokenCode: number }>(emailVerificationToken.token)

        if (decoded.tokenCode !== tokenVal.tokenCode) {
            return NextResponse.json({ error: 'Verifikacijski token je istekao...' }, { status: 400 })
        }

        const user = await prisma.user.create({
            data: {
                email: emailVerificationToken.email,
                name: emailVerificationToken.name,
                password: emailVerificationToken.password
            }
        })

        await prisma.emailVerificationToken.deleteMany({
            where: {
                email: user.email
            }
        })

        return NextResponse.json({ message: 'success'  }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}
