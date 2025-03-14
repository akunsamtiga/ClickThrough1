import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next-Gen Cloud | Layanan Cloud Terbaik untuk Keamanan & Kecepatan",
  description: "Tingkatkan efisiensi bisnis Anda dengan layanan cloud tercepat & paling aman. Coba Next-Gen Cloud gratis selama 14 hari!",
  keywords: "cloud computing, hosting cloud terbaik, server cloud cepat, layanan cloud aman, cloud bisnis",
  author: "Next-Gen Cloud",
  robots: "index, follow",
  ogTitle: "Next-Gen Cloud | Cloud Tercepat & Teraman untuk Bisnis Anda",
  ogDescription: "Next-Gen Cloud adalah solusi cloud modern dengan kecepatan, keamanan, dan fleksibilitas tinggi untuk bisnis berkembang.",
  ogImage: "/images/og-image.png",
  ogUrl: "https://nextgencloud.com",
  twitterCard: "summary_large_image",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
