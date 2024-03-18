import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "@uploadthing/react/styles.css";
import "@mantine/core/styles.css";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import StyledComponentsRegistry from "@/lib/registry";
const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Threads Clone",
    description: "Threads Clone, by Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={font.className}>
                    <StyledComponentsRegistry>
                        <Providers>{children}</Providers>
                    </StyledComponentsRegistry>
                </body>
            </html>
        </ClerkProvider>
    );
}
