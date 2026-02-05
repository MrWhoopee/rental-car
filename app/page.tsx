import Link from "next/link";
import Image from "next/image";
import css from "./page.module.css";
import heroImg from "@/public/heroImage/hero2x.jpg";

export default async function Home() {
  return (
    <div className={css.heroWrapper}>
      <Image
        src={heroImg}
        alt="Rental car on the road"
        fill
        priority
        quality={85}
        className={css.heroImage}
        sizes="100vw"
      />

      <div className={css.heroContent}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link href="/catalog" className="button-link">
          View Catalog
        </Link>
      </div>
    </div>
  );
}
