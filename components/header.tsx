import {LINKS} from "@/config/site";
import SocialBar from "@/components/socialBar";
import Carousel from "@/components/carousel";


export default function Header(){

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-60 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full lg:my-12">
                        <Carousel />
                    </div>

                    <div className="lg:py-12">
                        <h2 className="text-3xl font-bold sm:text-4xl text-purple-500">PEPE on SOL</h2>

                        <p className="mt-4 text-purple-600">
                            <b>Welcome to PepeCoin - The Fun and Fast Meme Coin on Solana!</b><br/><br/>

                            Welcome to the official PepeCoin website, where the world of memes meets the blazing speed
                            and efficiency of the Solana blockchain. Inspired by the legendary internet meme Pepe the
                            Frog, PepeCoin is more than just a cryptocurrency; it's a vibrant community and a movement.
                            Our mission is to bring fun, humor, and innovation to the world of digital assets while
                            leveraging Solana's cutting-edge technology to ensure lightning-fast transactions and low
                            fees.

                            <br/><br/>
                            <b>Why PepeCoin?</b><br/>

                            <br/>
                            - <b>Memetastic Fun</b>: Immerse yourself in a community that celebrates creativity, humor,
                            and the
                            spirit of the internet's most beloved meme.<br/><br/>
                            - <b>Solana Speed</b>: Experience the power of the Solana blockchain with ultra-fast
                            transactions
                            and minimal fees, ensuring seamless and efficient trading.<br/><br/>
                            - <b>Community-Driven</b>: Join a decentralized community where your voice matters.
                            Participate in
                            governance, propose ideas, and shape the future of PepeCoin.<br/><br/>
                            - <b>Secure & Transparent</b>: Built on Solana's robust and secure infrastructure, PepeCoin
                            ensures
                            transparency and reliability in every transaction.<br/><br/>
                        </p>

                        <br />
                        <SocialBar />
                    </div>
                </div>
            </div>
        </section>
    )
}