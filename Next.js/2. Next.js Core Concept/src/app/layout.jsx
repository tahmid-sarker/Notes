import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Next.js Core Concepts - Part 2",
    template: "%s | Next.js Core Concepts - Part 2",
  },
  description: "Welcome to Next.js Core Concepts Part 2 Application",
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
  );
}