import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Hero from "@/components/hero/Hero";
import Input from "@/components/input/Input";
import boostBg from "../public/assets/bg-boost-desktop.svg";
import ServiceCard from "@/components/services/ServiceCard";
import { v4 as uuid } from "uuid";
import crypto from "crypto";

const inter = Inter({ subsets: ["latin"] });
const cardData = [
  {
    id: crypto.randomBytes(16).toString("hex"),
    image: "assets/icon-brand-recognition.svg",
    title: "Brand Recognition",
    description:
      "Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instil confidence in your content.",
  },
  {
    id: crypto.randomBytes(16).toString("hex"),
    image: "assets/icon-detailed-records.svg",
    title: "Detailed Records",
    description:
      "Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions..",
  },
  {
    id: crypto.randomBytes(16).toString("hex"),
    image: "assets/icon-fully-customizable.svg",
    title: "Fully Customizable",
    description:
      "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
  },
  {
    id: crypto.randomBytes(16).toString("hex"),
    image: "assets/icon-fully-customizable.svg",
    title: "Fully Customizable",
    description:
      "Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.",
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Shortly: URL Shortener</title>
        <meta
          name="description"
          content="Shortly: The quickest way to shorten your URLs. || Coded by Paul Oluwatoni Ariyo-Adeoye (TonniPaul"
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
            {cardData.map(({ id, image, title, description }) => {
              return (
                <ServiceCard
                  key={id}
                  image={image}
                  title={title}
                  description={description}
                />
              );
            })}

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
