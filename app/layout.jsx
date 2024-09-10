import localFont from "next/font/local";
import "./globals.css";
import { Figtree } from "next/font/google";
import Header from "../components/Header";

const figtree = Figtree({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "GENAI MEME",
  description: "An Ai Generating meme editor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${figtree.className} antialiased min-h-screen relative`}
      >
        <Header />
        <main className="container mx-auto py-10">{children}</main>
        <footer className="text-center text-sm py-4 absolute inset-x-0 bottom-0">
          <p className="text-gray-500">
            Copyright &copy; {new Date().getFullYear()} GENAI MEME, All rights
            reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
