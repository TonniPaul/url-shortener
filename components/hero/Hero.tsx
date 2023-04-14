import Image from "next/image";
import heroStyle from "./hero.module.css";

const Hero = () => {
  return (
    <section>
      <div className={heroStyle.hero_container}>
        <Image
          src={"/assets/illustration-working.svg"}
          alt={"hero-img"}
          width={562}
          height={320}
          className={heroStyle.hero_img}
          priority
        />
        <div className={heroStyle.hero_text_cont}>
          <h1>More than just shorter links</h1>
          <p>
            Build your brand’s recognition and get detailed insights on how your
            links are performing.
          </p>
          <button onClick={(e) => e.preventDefault()}>Get Started</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
