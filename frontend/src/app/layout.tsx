import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { AuthProvider } from "./_context/AuthProvider";

const rale = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetYourWay.com",
  description: "Sky group project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          rale.className +
          " max-w-[1400px] mx-auto px-4 bg-[#FAF9F9] background-gradient"
        }
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
