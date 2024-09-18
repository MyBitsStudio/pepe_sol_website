import {PublicKey} from "@solana/web3.js";

interface SiteConfig {
    name: string
    title: string
    emoji: string
    description: string
    localeDefault: string
    links: {
        telegram: string
        discord: string
        twitter: string
    }
}

export const siteConfig: SiteConfig = {
    name: "Hat Swap",
    title: "Hat Swap - Fast, Secure, Decentralized Exchange on Solana",
    emoji: "⚡",
    description: "Fast, secure, and easy-to-use decentralized exchange on Solana. Trade SPL tokens with low fees and high speed.",
    localeDefault: "en",
    links: {
        telegram: "https://docs.turboeth.xyz/overview",
        discord: "https://discord.gg/U4jy7Xfh76",
        twitter: "https://twitter.com/district_labs",
    },
}

export const QUICK = "https://neat-magical-butterfly.solana-mainnet.quiknode.pro/efb9ba3fcdb9b70776ee7daac7c3b8d21899bb2c/";

// You can use any of the other enpoints here
export const NETWORK = QUICK;

export const LINKS = [
    "https://t.me/PEPEONPUMPFUN11", //telegram
    "#", //X
    "#", //dexscreener
]

export const SOL_ADDRESS = "So11111111111111111111111111111111111111112"