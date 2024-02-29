import { Inter } from 'next/font/google';
import './globals.css';
import { ContextProvider } from '@/app/SocketContext';
import NavBar from '@/components/NavBar';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'миглер чат',
  description: 'миглер чат',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
