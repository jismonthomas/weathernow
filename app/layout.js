import { Inter } from 'next/font/google';
import './globals.css';
import { Theme } from '@/components/ui/theme-provider';
import { dm_sans } from '@/components/ui/fonts';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Weather Now',
    description: 'Jismon Thomas',
};

export default function RootLayout({ children, modal }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${dm_sans.className}`}>
                <Theme
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={true}
                    disableTransitionOnChange>
                    {children}
                    {modal}
                </Theme>
            </body>
        </html>
    );
}
