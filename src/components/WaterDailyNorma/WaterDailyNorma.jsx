import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = ({ dailyNorma }) => {
  return (
    <div className={css.waterDailyNorma}>
      <p>{dailyNorma} L</p>
      <p>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
