import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './style/style.css'
import Nav from './components/Nav/Nav'
import SessionProvider from './components/SessionProvider'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agora',
  description: 'Agora portal',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Nav />
          <div style={{height: '10vh'}}></div>
          <main className='container'>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
