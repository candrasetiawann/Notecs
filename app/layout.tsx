import "./globals.css";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Provider from "@/app/components/auth/Provider";

export const metadata = {
  title: "Notecs",
  description: "Documenting Your Ideas and Insights",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="div">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
