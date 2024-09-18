import {ReactNode} from "react";
import {SiteHeader} from "@/components/layout/header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface RootLayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <>
            <div>
                <SiteHeader />
                <ToastContainer
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <main className="flex-1">{children}</main>
                {/*<Footer />*/}
            </div>

        </>
    )
}