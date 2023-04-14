import Image from "next/image";
import footerStyle from "./footer.module.css";
import logo from "../../public/assets/logo.svg";
const Footer = () => {
  return (
    <section className={footerStyle.footer_section}>
      <div className={footerStyle.footer_sub_div}>
        <Image src={logo} alt="logo" priority className="footer_logo" />
        <ul className={footerStyle.footer_ul}>
          <li className={footerStyle.footer_links_header}>Features </li>
          <li> Link Shortening</li>
          <li>Branded Links</li>
          <li>Analytics</li>
        </ul>
        <ul className={footerStyle.footer_ul}>
          <li className={footerStyle.footer_links_header}> Resources </li>
          <li>Blog</li>
          <li>Developers</li>
          <li>Support</li>
        </ul>
        <ul className={footerStyle.footer_ul}>
          <li className={footerStyle.footer_links_header}>Company</li>
          <li>About</li>
          <li>Our Team</li>
          <li>Careers</li>
          <li>Contact</li>
        </ul>
        <ul className={footerStyle.footer_ul_icons}>
          <li className={footerStyle.footer_links_header}></li>
          <li>
            <Image
              src={"/assets/icon-facebook.svg"}
              alt="facebook"
              width={24}
              height={24}
            />
          </li>
          <li>
            <Image
              src={"/assets/icon-twitter.svg"}
              alt="twitter"
              width={24}
              height={24}
            />
          </li>
          <li>
            <Image
              src={"/assets/icon-pinterest.svg"}
              alt="pinterest"
              width={24}
              height={24}
            />
          </li>
          <li>
            <Image
              src={"/assets/icon-instagram.svg"}
              alt="instagram"
              width={24}
              height={24}
            />
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
