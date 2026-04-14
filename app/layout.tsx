import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const body = Outfit({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'I.U.G Clothing | Traditional Craft, Modern Precision',
  description: 'Bespoke fashion house by Ibrahim Usman Yusuf merging Northern Nigerian heritage with modern silhouettes.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-[var(--primary)] text-white`}>
        {children}
      </body>
    </html>
  );
}