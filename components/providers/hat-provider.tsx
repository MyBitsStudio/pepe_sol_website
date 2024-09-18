"use client"

import {ReactNode, useMemo} from "react";
import {ConnectionProvider} from "@solana/wallet-adapter-react";
import {NETWORK} from "@/config/site";
import {
    CoinbaseWalletAdapter, NightlyWalletAdapter,
    PhantomWalletAdapter,
    SolflareWalletAdapter,
    UnsafeBurnerWalletAdapter, WalletConnectWalletAdapter
} from "@solana/wallet-adapter-wallets";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import {ThemeProvider} from "next-themes";
import ClientWalletProvider from "@/components/providers/ClientWalletProvider";
import {UserProvider} from "@/components/providers/user-provider";

interface RootProviderProps {
    children: ReactNode
}

const ReactUIWalletModalProviderDynamic = dynamic(
    async () =>
        (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
    { ssr: false }
);

export default function RootProvider({ children }: RootProviderProps) {
    const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new UnsafeBurnerWalletAdapter(), new CoinbaseWalletAdapter(),
    new NightlyWalletAdapter()], []);
    return (
        <>
            <ThemeProvider
                themes = {
                [
                    "light",
                    "dark",
                    "cupcake",
                    "bumblebee",
                    "emerald",
                    "corporate",
                    "synthwave",
                    "retro",
                    "cyberpunk",
                    "valentine",
                    "halloween",
                    "garden",
                    "forest",
                    "aqua",
                    "lofi",
                    "pastel",
                    "fantasy",
                    "wireframe",
                    "black",
                    "luxury",
                    "dracula",
                    "cmyk",
                    "autumn",
                    "business",
                    "acid",
                    "lemonade",
                    "night",
                    "coffee",
                    "winter",
                    "dim",
                    "nord",
                    "sunset",
                ]
            }
                defaultTheme="synthwave"
                enableSystem
                attribute = 'data-theme'
            >
                <ConnectionProvider endpoint={NETWORK}>
                    <ClientWalletProvider wallets={wallets}>
                        <ReactUIWalletModalProviderDynamic>
                            <UserProvider >
                                <Toaster position="bottom-right" reverseOrder={true} />
                                {children}
                            </UserProvider>
                        </ReactUIWalletModalProviderDynamic>
                    </ClientWalletProvider>
                </ConnectionProvider>
            </ThemeProvider>
        </>
    )
}