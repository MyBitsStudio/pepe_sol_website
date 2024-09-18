"use client"

import {useState} from "react";

export default function RoadMap(){

    const [section, setSection] = useState('dev')

    const handleSectionClick = (id: string) => {
        setSection(section === id ? '' : id);
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={"flex justify-center w-full py-8"}>

            <div>
                <h1 className={"flex justify-center text-center text-purple-500 font-extrabold text-2xl"}>Roadmap</h1>
                <br/>
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className="h-2 w-1/4 rounded-full bg-purple-500"></div>
                </div>

                <ol className="mt-4 grid grid-cols-4 text-sm font-medium text-purple-700 gap-4">
                    <li className="flex items-center sm:gap-1.5">
                        <button onClick={() => {
                            handleSectionClick('dev')
                        }}>
                            <span className="hidden sm:inline"> Development </span>
                        </button>
                        <img src={"sol.gif"} alt={"PEPE"} width={"36"} height={"36"}/>
                    </li>

                    <li className="flex items-center sm:gap-1.5">
                        <button onClick={() => {
                            handleSectionClick('com')
                        }}>
                            <span className="hidden sm:inline"> Community </span>
                        </button>
                    </li>

                    <li className="flex items-center sm:gap-1.5">
                        <button onClick={() => {
                            handleSectionClick('utl')
                        }}>
                            <span className="hidden sm:inline"> Utilities </span>
                        </button>
                    </li>

                    <li className="flex items-center sm:gap-1.5">
                        <button onClick={() => {
                            handleSectionClick('gro')
                        }}>
                            <span className="hidden sm:inline"> Growth </span>
                        </button>
                    </li>
                </ol>
                <br/>
                <article className="rounded-xl border border-gray-700 bg-gray-800 p-4">
                    <div className="flex items-center text-center gap-4">

                        <div id={"dev"} className={`mb-8 ${section === 'dev' ? 'block' : 'hidden'}`}>
                            <h3 className="mx-52 text-lg font-medium text-purple-500">Development</h3>
                            <ul className="mt-4 space-y-2">
                                <li>
                                    <div
                                        className="block h-full rounded-lg border border-green-500 p-4">
                                        <strong className="font-medium text-green-500">Pre-Development</strong>

                                        <p className="mt-1 text-xs font-medium text-purple-400">
                                            Develop Telegram channel ✅<br/>
                                            Develop Twitter account ✅<br/>
                                            Build Team ✅<br/>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div
                                        className="block h-full rounded-lg border border-green-500 p-4">
                                        <strong className="font-medium text-green-500">Development</strong>

                                        <p className="mt-1 text-xs font-medium text-purple-400">
                                            Create Website ✅<br/>
                                            Launch on Pump.fun ✅<br/>
                                            Release to initial channels ✅<br/>
                                            Release to the public ✅<br/>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div id={"com"} className={`mb-8 ${section === 'com' ? 'block' : 'hidden'}`}>
                            <h3 className="mx-52 text-lg font-medium text-purple-500">Community</h3>
                            <p className='text-purple-700'>section.</p>
                        </div>

                        <div id={"utl"} className={`mb-8 ${section === 'utl' ? 'block' : 'hidden'}`}>
                            <h3 className="mx-52 text-lg font-medium text-purple-500">Utilities</h3>
                            <p className='text-purple-700'>section.</p>
                        </div>

                        <div id={"gro"} className={`mb-8 ${section === 'gro' ? 'block' : 'hidden'}`}>
                        <h3 className="mx-52 text-lg font-medium text-purple-500">Growth</h3>
                            <p className='text-purple-700'>section.</p>
                        </div>
                    </div>
                </article>
            </div>


        </div>

    )
}