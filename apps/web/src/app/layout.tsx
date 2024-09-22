import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css'
import { Footer } from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import { NavigationBar } from '@/components/Header-New';
import { UserLoginProvider } from '@/context/UserContext';
import Navbar from '@/components/navbar';
import Botbar from '@/components/botbar';



const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KONSERIA',
  description: 'Greatest event organizer in the World',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserLoginProvider>
      <body className={inter.className}>
        {/* <Navbar /> */}
        <NavigationBar />
        {children} 
        <ToastContainer 
          position='top-center'
          closeOnClick
        />
        <Footer />
      </body>
        </UserLoginProvider>
    </html>
  );
}
