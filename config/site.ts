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
    "https://x.com/pepeonpumpfun?s=21", //X
    "https://dexscreener.com/solana/32oszbqqfaafzcg6guobjz9gnpyh2qta7cokrdsxjvsk", //dexscreener
]

export const SOL_ADDRESS = "So11111111111111111111111111111111111111112"

export const FEE_ACCOUNT = "[125,29,181,97,156,179,53,82,160,192,239,12,148,254,204,149,216,187,55,42,48,220,27,138,157,30,69,95,103,68,250,206,141,86,168,65,236,92,145,15,153,255,223,210,177,73,227,245,74,91,198,54,185,145,203,29,183,139,160,189,186,79,159,206]"