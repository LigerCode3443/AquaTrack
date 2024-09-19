import css from "./WaterDailyNorma.module.css";

const WaterDailyNorma = ({ dailyNorma }) => {
  return (
    <div className={css.waterDailyNorma}>
      <h4>{dailyNorma ? dailyNorma : 0} L</h4>
      <p>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
