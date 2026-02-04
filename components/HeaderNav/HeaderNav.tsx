"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./HeaderNav.module.css";

export default function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link
            href="/"
            className={`${css.navLink} ${pathname === "/" ? css.active : ""}`}
          >
            Home
          </Link>
        </li>
        <li className={css.navItem}>
          <Link
            href="/catalog"
            className={`${css.navLink} ${pathname === "/catalog" ? css.active : ""}`}
          >
            Catalog
          </Link>
        </li>
      </ul>
    </nav>
  );
}
