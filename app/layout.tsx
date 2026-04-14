import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const headingFont = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  display: 'swap' 
});

const bodyFont = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap'
});

export const metadata = {
  title: 'I.U.G Clothing | Bespoke Nigerian Tailoring',
  description: 'Traditional Craft, Modern Precision by Ibrahim Usman Yusuf.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased selection:bg-[var(--accent)] selection:text-black`}>
        {children}
      </body>
    </html>
  );
}