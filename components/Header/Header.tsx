import Image from "next/image";
import css from "./Header.module.css";
import HeaderNav from "../HeaderNav/HeaderNav";
import Link from "next/link";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.logo}>
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={104} height={16} priority />
        </Link>
      </div>
      <HeaderNav />
    </header>
  );
}
