"use client"

import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";

export default function Navbar(){
    return (
        <div className="navbar bg-base-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">HatSwap</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a>Swap</a></li>
                    <li>
                        <details>
                            <summary>Utilities</summary>
                            <ul className="p-2">
                                <li><a>Charts</a></li>
                                <li><a>Widgets</a></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details>
                            <summary>Docs</summary>
                            <ul className="p-2">
                                <li><a>User</a></li>
                                <li><a>Developer</a></li>
                                <li><a>About</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                <WalletMultiButton className="btn" />
            </div>
        </div>
    )
}