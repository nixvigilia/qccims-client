import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import {Inter} from "next/font/google";
import {Toaster} from "react-hot-toast";
import ThemeProviderWrapper from "@/utils/theme/ThemeProviderWrapper";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "QCC - Inventory Management System",
  description: "QCC - Inventory Management System",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        <AppRouterCacheProvider options={{key: "css"}}>
          <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
