import Image from "next/image";
import serviceCardStyle from "./serviceCard.module.css";

const ServiceCard = () => {
  return (
    <div className={serviceCardStyle.card_main_container}>
      <div className={serviceCardStyle.image_container}>
        <Image
          src={"/assets/icon-brand-recognition.svg"}
          alt="icon"
          width={50}
          height={50}
        />
      </div>
      <p className={serviceCardStyle.service_header_text}>Brand Recognition</p>
      <p>
        Boost your brand recognition with each click. Generic links don’t mean a
        thing. Branded links help instil confidence in your content.
      </p>
    </div>
  );
};

export default ServiceCard;
