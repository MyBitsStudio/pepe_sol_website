"use client"

import {useTheme} from "next-themes";
import {Inter} from "next/font/google";
import RootProvider from "@/components/providers/hat-provider";
import {Analytics} from "@vercel/analytics/react";
import {useScript} from "@/utils/UseScript";
const inter = Inter({ subsets: ['latin'] })

export default function Base({ children }: { children: React.ReactNode }) {

    const theme = useTheme()

    return (
        <html lang='en' suppressHydrationWarning data-theme={theme ? theme : "forest"}>
            <body className={inter.className}>
                <Analytics/>
                <RootProvider>
                    {children}
                </RootProvider>
            </body>
        </html>
    )
}