import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/context/SoundContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
  metadataBase: new URL("https://bodajosefinalucas.vercel.app"),
  title: "Josefina & Lucas — 06.02.2027 | Valencia",
  description: "Enlace civil en Jardines de Monforte y celebración en Veneno. Cóctel largo, música y cero convencionalismos.",
  openGraph: {
    title: "Josefina & Lucas — Boda en Valencia",
    description: "06.02.2027 • Monforte & Veneno",
    type: "website",
    url: "https://bodajosefinalucas.vercel.app",
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
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--fg-primary)] font-sans antialiased selection:bg-[var(--accent-gold)] selection:text-black transition-colors duration-500">
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll>
              <div className="noise-overlay" aria-hidden="true" />
              <div className="relative flex min-h-screen flex-col overflow-x-hidden">
                {children}
              </div>
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
