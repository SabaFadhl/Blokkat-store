import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'; // Font Awesome CSS
import '../lib/fontawesome'; // Import the Font Awesome library
import { CartProvider } from "@/context/CartContext";


const inter = Inter({ subsets: ['latin'] })

import { headers } from 'next/headers' // added
import ContextProvider from '@/context'

export const metadata: Metadata = {
  title: 'Blokkat Shop',
  description: 'Powered by Reown'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const headersObj = await headers();
  const cookies = headersObj.get('cookie')

return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap existing ContextProvider first, then wrap CartProvider */}
        <ContextProvider cookies={cookies}>
          <CartProvider>{children}</CartProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
