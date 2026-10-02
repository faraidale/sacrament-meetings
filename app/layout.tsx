import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: {
    default: "Colne Valley Ward Planner",
    template: "%s | Colne Valley Ward Planner",
  },
  description: "View and manage Colne Valley Ward sacrament meeting agendas and schedules.",
  openGraph: {
    type: "website",
    siteName: "Colne Valley Ward Planner",
    title: "Colne Valley Ward Planner",
    description: "View and manage Colne Valley Ward sacrament meeting agendas and schedules.",
    images: [{ url: "/sacrament.jpg", width: 800, height: 500, alt: "Sacrament meeting table" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/sacrament.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
