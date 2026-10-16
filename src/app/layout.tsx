import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/context/SoundContext";
import { SmoothScroll } from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Lucas & Josefina — 06.02.2027 | Valencia",
  description: "Enlace civil en Jardines de Monforte y celebración en Veneno. Cóctel largo, música y cero convencionalismos.",
  openGraph: {
    title: "Lucas & Josefina — Boda en Valencia",
    description: "06.02.2027 • Monforte & Veneno",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#09090b] text-[#f4f4f6] font-sans antialiased selection:bg-[#dfb15b] selection:text-black">
        <SoundProvider>
          <SmoothScroll>
            <div className="noise-overlay" aria-hidden="true" />
            <div className="relative flex min-h-screen flex-col overflow-x-hidden">
              {children}
            </div>
          </SmoothScroll>
        </SoundProvider>
      </body>
    </html>
  );
}
