import Link from "next/link";
import css from "./page.module.css";

export default async function Home() {
  // const cars = await getCars();
  // console.log(cars);
  return (
    <div className={css.hero}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <h2 className={css.subtitle}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <Link href="/catalog" className="button-link">
        View Catalog
      </Link>
    </div>
  );
}
