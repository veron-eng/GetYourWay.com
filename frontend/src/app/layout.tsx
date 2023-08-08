import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { AuthProvider } from "./_context/AuthProvider";
import background from "../../public/background.jpg";

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
      <body className={rale.className + "max-w-[1420x] background-container"}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
