import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Providers from '@/lib/providers';

export const metadata: Metadata = {
  title: 'TravelTrucks',
  description: 'Camper rental service',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
