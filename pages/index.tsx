import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Hero from "@/components/hero/Hero";
import Input from "@/components/input/Input";
import boostBg from "../public/assets/bg-boost-desktop.svg";

import ServiceCard from "@/components/services/ServiceCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Shortly URL shortening web app</title>
        <meta
          name="description"
          content="Generate shorter links for your existing links || Coded by Paul Oluwatoni Ariyo-Adeoye (TonniPaul"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <Hero />
        <Input />
        <section className={styles.services_container}>
          <p className={styles.service_header_text}>Advanced Statistics</p>
          <p className={styles.service_description_text}>
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
          <div className={styles.serviceCard_sub_container}>
            <ServiceCard />
            <ServiceCard />
            <ServiceCard />

            <hr className={styles.line} />
          </div>
        </section>
        <section className={styles.boost_section}>
          <Image src={boostBg} alt="boost-bg" className={styles.boostBgImg} />
          <div>
            <p>Boost your links today</p>
            <button>Get Started</button>
          </div>
        </section>
      </main>
    </>
  );
}
