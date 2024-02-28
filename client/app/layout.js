import { Inter } from 'next/font/google';
import './globals.css';
import { ContextProvider } from '@/app/SocketContext';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'миглер чат',
  description: 'миглер чат',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
