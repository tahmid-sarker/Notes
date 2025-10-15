import "./globals.css";
import Header from "../components/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Next.js Core Concepts - Part 1",
  description: "Welcome to Next.js Core Concepts Part 1 Application",
  icon: "/tahmid.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased min-h-screen`}>
        <header>
          <Header />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <p className="text-center p-4">© {new Date().getFullYear()} Next.js Core Concepts</p>
        </footer>
      </body>
    </html>
  )
}