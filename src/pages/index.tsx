import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>YOTECH - GAME FRUIT FALL</title>
                <meta name="description" content="YOTECH - GAME FRUIT FALL" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                <AppWithoutSSR />
            </main>
        </>
    );
}
