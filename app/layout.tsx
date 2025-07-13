import Header from '@/components/Header/Header';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Roboto } from 'next/font/google';

import 'modern-normalize';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
