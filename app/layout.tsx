import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { FloatingChat } from "@/components/Chat";
import { ChatProvider } from "@/components/ChatProvider";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-serif" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.tagline,
  openGraph: { title: site.name, description: site.tagline, type: "website", locale: "es_ES" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="aurora" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <ChatProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
        </ChatProvider>
      </body>
    </html>
  );
}
