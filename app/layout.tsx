import type { Metadata } from 'next'
import './globals.css'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import { noto_serif_jp } from './fonts'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Encor6',
  description: "Encor6 brand's e-commerce site",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${noto_serif_jp.className} text-slate-700`}>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(51 65 85)',
            color: '#fff'
          },
        }}
        />
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <NavBar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
