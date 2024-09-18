"use client"

import {useState} from "react";
import {createJupiterApiClient, QuoteResponse, SwapResponse} from "@jup-ag/api";
import {NETWORK, SOL_ADDRESS} from "@/config/site";
import {Connection, LAMPORTS_PER_SOL, PublicKey, VersionedTransaction} from "@solana/web3.js";
import {useWallet} from "@solana/wallet-adapter-react";
import {toast} from "react-toastify";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {Simulate} from "react-dom/test-utils";
import {HashLoader, ScaleLoader} from "react-spinners";
import {useMediaQuery} from "usehooks-ts";


const connection = new Connection(NETWORK, 'confirmed');
const jupiterApi = createJupiterApiClient({basePath: "https://quote-api.jup.ag/v6"});

export default function Terminal() {

    const { wallet, publicKey, signTransaction, connected } = useWallet();

    const [loading, setLoading] = useState<boolean>(false)
    const [quoting, setQuoting] = useState<boolean>(false)
    const [sol, setSol] = useState<string>("1") // amount in form to be inputted
    const [usd, setUsd] = useState<number>(0) // price in sol for purchase
    const [quote, setQuote] = useState<number>(0) // amount to be given
    const [fees, setFees] = useState<number>(0) // swap fees
    const [slippage, setSlippage] = useState<number>(100) // slippage
    const [minimum, setMinimum] = useState<number>(0) // minimum amount
    const [impact, setImpact] = useState<number>(0) // impact
    const [timestamp, setTimestamp] = useState<number>(0) // timestamp
    const [ready, setReady] = useState<boolean>(false) // ready to swap
    const[ buyResponse, setBuyResponse] = useState<SwapResponse | null>(null)

    let buyQuote: QuoteResponse | null = null

    function changeQuote(){
        reset()
        setLoading(true)
        setQuoting(true)
        checkQuote()
    }

    function checkQuote(){

        async function check() {
            await jupiterApi.quoteGet({
                inputMint: SOL_ADDRESS,
                outputMint: "AD3P6ezuLMP9heghbL7B9UkdLBhu2ZycTgaNB9XVpump",
                amount: Number((Number(sol) * LAMPORTS_PER_SOL).toFixed(0)),
                autoSlippage: true,
                autoSlippageCollisionUsdValue: 1_000,
                maxAutoSlippageBps: slippage,
                minimizeSlippage: true,
                onlyDirectRoutes: false,
                asLegacyTransaction: false,
            }).then(async r => {
                if (r) {
                    buyQuote = r

                    setQuote(Number(r.outAmount))
                    setFees(Number(r.platformFee))
                    setMinimum(Number(r.otherAmountThreshold))
                    setImpact(Number(r.priceImpactPct))

                    await jupiterApi.swapPost({
                        swapRequest: {
                            quoteResponse: r,
                            userPublicKey: publicKey?.toBase58() as string,
                            dynamicComputeUnitLimit: true,
                            prioritizationFeeLamports: "auto",
                        }
                    }).then(async r => {
                        if (r) {
                            setBuyResponse(r)

                            await jupiterApi.quoteGet({
                                inputMint: SOL_ADDRESS,
                                outputMint: "AD3P6ezuLMP9heghbL7B9UkdLBhu2ZycTgaNB9XVpump",
                                amount: Number((LAMPORTS_PER_SOL).toFixed(0)),
                                autoSlippage: true,
                                autoSlippageCollisionUsdValue: 1_000,
                                maxAutoSlippageBps: slippage,
                                minimizeSlippage: true,
                                onlyDirectRoutes: false,
                                asLegacyTransaction: false,
                            }).then(async r => {
                                setUsd(Number(r?.outAmount))
                            }).catch(e => {
                                console.error("Error", e)
                                reset()
                            })

                        }
                    }).catch(e => {
                        console.error("Error", e)
                        reset()
                    })
                }
            }).catch(e => {
                console.error("Error", e)
                reset()
            })
        }

        if(Number(sol) > 0){
            if(!checkBalance()){
                reset()
                return
            }

            check().then(() => {
                finalize()
                toast.success("Ready to swap!")
            })

        } else {
            reset()
        }
    }

    function reset(){
        setQuoting(false)
        setUsd(0)
        setQuote(0)
        setFees(0)
        setLoading(false)
        setTimestamp(Date.now())
    }

    function finalize(){
        setQuoting(false)
        setLoading(false)
        setReady(true)
        setTimestamp(Date.now())
    }

    function checkBalance(){

        async function check() {
            try {
                const balance = await connection.getBalance(publicKey as PublicKey, 'confirmed') / LAMPORTS_PER_SOL

                return balance > Number(sol)
            } catch (e) {
                console.error("Error", e)
                return false
            }
        }

        return check()

    }

    function purchase(){

        async function sendTransaction(){

            if(!buyResponse){
                toast.error("Error swapping...")
                console.error("No swap response")
                return
            }

            if(!signTransaction){
                toast.error("Error swapping...")
                console.error("No sign transaction")
                return
            }

            // @ts-ignore
            const swapTransactionBuf = Buffer.from(buyResponse.swapTransaction, "base64")
            const trans = VersionedTransaction.deserialize(swapTransactionBuf)


            if(trans) {
                    const signed = await signTransaction(trans)

                    if (signed) {

                        toast.info("Sending transaction... Please wait")

                        try {

                            const latestBlockHash = await connection.getLatestBlockhash()

                            const tx = await connection.sendRawTransaction(signed.serialize(), {
                                skipPreflight: true,
                                maxRetries: 5,
                            })

                            console.log("tx", tx)

                            await connection.confirmTransaction({
                                blockhash: latestBlockHash.blockhash,
                                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                                signature: tx
                            })

                            toast.success((t) => (
                                <a
                                    href={`https://solscan.io/tx/${tx}`}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Transaction finalized
                                </a>
                            ))


                        } catch (e) {
                            console.error("Error", e)
                        }
                } else {
                    reset()
                }
            } else {
                finalize()
            }
        }

        sendTransaction().then(() => {

        })
    }
    function useIsMobile() {
        return useMediaQuery('(max-width: 1000px)')
    }


    return (

        <div className={"container flex justify-self-center lg:mx-96"}>
        <section>
            <div className="lg:grid lg:grid-cols-2 lg:mx-12">
                <section className="flex mx-4">

                    {useIsMobile() ? (
                        <div id="dexscreener-embed">
                            <iframe height={500} width={420}
                                    src="https://dexscreener.com/solana/AD3P6ezuLMP9heghbL7B9UkdLBhu2ZycTgaNB9XVpump?embed=1&theme=dark&info=0"></iframe>
                        </div>
                    ) : (
                        <div id="dexscreener-embed">
                            <iframe height={600} width={600}
                                    src="https://dexscreener.com/solana/AD3P6ezuLMP9heghbL7B9UkdLBhu2ZycTgaNB9XVpump?embed=1&theme=dark&info=0"></iframe>
                        </div>
                    )}


                </section>

                <div className="max-w-xl lg:max-w-3xl">
                    <h2 className="mt-6 mx-20 text-2xl font-bold text-purple-700 sm:text-3xl md:text-4xl">
                        💎Buy PEPE on SOL💎
                    </h2>
                    <br />
                    {connected ? (
                        <main
                            className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                        >


                            <br/>

                            <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
                                <div className="">

                                    <form>
                                        <div>
                                            <label
                                                htmlFor="SOL"
                                                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                            >
                                                <input
                                                    type="text"
                                                    id="sol"
                                                    className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                                    placeholder="SOL"
                                                    onChange={(e) => {
                                                        setSol(e.target.value)
                                                    }}
                                                    value={sol}
                                                />

                                                <span
                                                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 p-0.5 text-xs text-white transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                                                >
                                            SOL
                                        </span>
                                            </label>


                                        </div>

                                    </form>
                                </div>

                                <br/>

                                <div className={"flex justify-center"}>

                                    <button
                                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                        onClick={changeQuote}

                                    >
                                        Quote
                                    </button>

                                </div>


                                <ul className="mt-4 space-y-2">
                                    <li>
                                        <div
                                            className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                                            <strong className="flex justify-center font-medium text-white">Swap
                                                Information</strong>
                                            <br/>

                                            <p className="mt-1 text-xs font-medium text-gray-300">
                                                {loading ? (
                                                    <HashLoader/>
                                                ) : (
                                                    <>
                                                        {quoting ? (
                                                            <ScaleLoader/>
                                                        ) : (
                                                            <>

                                                                {ready ? (
                                                                    <>
                                                                        <ul>
                                                                            <li className={"flex justify-center "}>
                                                                                <div
                                                                                    className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">

                                                                                    Price : <span
                                                                                    className="text-xs font-medium"> 1 SOL ~= {(usd / (1000000))} </span>
                                                                                </div>
                                                                            </li>
                                                                            <br/>
                                                                            <li className={"flex justify-center "}>
                                                                                <div
                                                                                    className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">

                                                                                    Swap : <span
                                                                                    className="text-xs font-medium"> {quote / (1000000)} </span>
                                                                                </div>
                                                                            </li>
                                                                            <br/>
                                                                            <li className={"flex justify-center "}>
                                                                                <div
                                                                                    className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">

                                                                                    Minimum : <span
                                                                                    className="text-xs font-medium"> {minimum / (1000000)} </span>
                                                                                </div>
                                                                            </li>
                                                                            <br/>
                                                                            <li className={"flex justify-center "}>
                                                                                <div
                                                                                    className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">

                                                                                    Platform Fees : <span
                                                                                    className="text-xs font-medium"> {fees ? fees / (1000000) : 0} </span>
                                                                                </div>
                                                                            </li>
                                                                            <br/>
                                                                            <li className={"flex justify-center "}>
                                                                                <div
                                                                                    className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">

                                                                                    Impact : <span
                                                                                    className="text-xs font-medium"> {impact} % </span>
                                                                                </div>
                                                                            </li>
                                                                            <br/>
                                                                            <li className={"flex justify-center "}>
                                                                                <button onClick={purchase}
                                                                                        className={"inline-block shrink-0 rounded-md border border-purple-700 bg-purple-400 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"}> Swap
                                                                                    Now
                                                                                </button>
                                                                            </li>
                                                                        </ul>


                                                                    </>

                                                                ) : (

                                                                    <div className={"flex justify-center"}>
                                                                        <div
                                                                            className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
                                                                            <span className="text-xs font-medium"> Ready to Quote !</span>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            </>
                                                        )}

                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </li>

                                    <li>
                                        <a target="_blank"
                                           rel="noreferrer" href="https://www.hatswap.app"
                                           className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600">
                                            <strong className="flex justify-center font-medium text-white">Powered by
                                                HatSwap</strong>
                                        </a>
                                    </li>
                                </ul>
                            </article>
                        </main>



                        ) : (
                        <div className="flex rounded border border-purple-700 bg-gray-800 p-2 items-center justify-center">
                            <WalletMultiButton className={"btn btn-outline btn-secondary"}/>
                        </div>
                        )}
                </div>
                </div>
        </section>
        </div>

    )
}