import { Parkinsans, Space_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import 'highlight.js/styles/github-dark.css';
import { Analytics } from '@vercel/analytics/next'

const parkinsans = Parkinsans({
  variable: "--font-parkinsans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ['400', '700'],
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hamd Waseem - Portfolio",
  description: "Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${parkinsans.variable} ${spaceMono.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
        <Analytics mode="production" />
      </body>
    </html>
  );
}
