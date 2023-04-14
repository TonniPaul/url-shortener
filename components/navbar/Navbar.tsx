import navStyle from "./navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import logo from "../../public/assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <header>
      <nav className={navStyle.nav}>
        <Link href="/" className={navStyle.logo}>
          <Image src={logo} alt="logo" priority />
        </Link>
        <div
          className={`${navStyle.nav_Links_flex} ${
            isOpen && navStyle.show_menu
          }`}
          onClick={handleClose}
        >
          <ul className={`${navStyle.navUl} ${navStyle.mb_menu_border}`}>
            <li>Features </li>
            <li>Pricing</li>
            <li>Resources</li>
          </ul>
          <ul className={navStyle.navUl}>
            <li className={navStyle.nav_link}>Login</li>
            <button className={`${navStyle.nav_link} ${navStyle.sign_up}`}>
              Sign Up
            </button>
          </ul>
        </div>
        <Image
          src={`${!isOpen ? "/assets/menu.svg" : "/assets/x-lg.svg"}`}
          width={32}
          height={32}
          alt={"menu"}
          onClick={handleClick}
          className={navStyle.mb_menu}
        />
      </nav>
    </header>
  );
};

export default Navbar;
