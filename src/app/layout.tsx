import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/hooks/useTheme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aurexus Bio',
  description: 'Aurexus Bio Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
