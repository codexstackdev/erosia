import type { Metadata } from "next";
import { Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "sonner";
import DisableDevtools from "./components/DisableDevTools";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const custom = Geist({
  variable: "--font-custom",
  subsets: ['latin'],
  weight: ['400']
})

export const metadata: Metadata = {
  title: "Erosia",
  description: "Your ultimate hub for adult entertainment. Stream high-quality scenes, explore trending content, and enjoy seamless playback on any device. With curated videos, intuitive navigation, and real-time updates, Erosia makes discovering and watching adult content fast, safe, and visually stunning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${custom.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster/>
          {/* <DisableDevtools/> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
