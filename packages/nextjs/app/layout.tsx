import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/logo.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Partaj",
  description: "Decentralize your website instantly",
  openGraph: {
    title: "Partaj",
    description: "Decentralize your website instantly",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: "Partaj",
    description: "Decentralize your website instantly",
  },
  icons: {
    icon: [{ url: "/logo.jpg", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  if (typeof window !== "undefined") {
    const storedVersion = localStorage.getItem("appVersion");
    if (storedVersion !== process.env.appVersion) {
      localStorage.setItem("appVersion", process.env.appVersion as string);
      window.location.reload();
    }
  }
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem defaultTheme="dark">
          <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
