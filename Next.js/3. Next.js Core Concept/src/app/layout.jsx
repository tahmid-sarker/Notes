import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { Poppins } from "next/font/google";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: {
    default: "Next.js Core Concepts - Part 3",
    template: "%s | Next.js Core Concepts - Part 3",
  },
  description: "Welcome to Next.js Core Concepts Part 3 Application",
  icon: "/tahmid.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased min-h-screen`}>
        <NextAuthSessionProvider>
        {/* Header */}
        <header>
          <Header />
        </header>
        {/* Main */}
          <main>
            {children}
          </main>
        {/* Footer */}
        <footer>
          <Footer />
        </footer>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}