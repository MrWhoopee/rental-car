import css from "./MakeCondition.module.css";

export default function MakeCondition({ arr }: { arr: string[] }) {
  return (
    <div className={css.conditionsWrapper}>
      {arr.map((item, index) => (
        <div className={css.conditionItem} key={index}>
          <svg width="16" height="16">
            <use href="/sprite.svg#check-circle"></use>
          </svg>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}
