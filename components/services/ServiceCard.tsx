import Image from "next/image";
import serviceCardStyle from "./serviceCard.module.css";

interface ServiceProps {
  image: string;
  title: string;
  description: string;
}

const ServiceCard = ({ image, title, description }: ServiceProps) => {
  return (
    <div className={serviceCardStyle.card_main_container}>
      <div className={serviceCardStyle.image_container}>
        <Image src={image} alt={`${title}-icon`} width={50} height={50} />
      </div>
      <p className={serviceCardStyle.service_header_text}>{title} </p>
      <p>{description}</p>
    </div>
  );
};

export default ServiceCard;
