import css from "./WaterDailyNorma.module.css";
// import { useSelector } from "react-redux";

const WaterDailyNorma = () => {
  // const dailyNorma = useSelector();

  return (
    <div className={css.waterDailyNorma}>
      {/* <h4>{dailyNorma ? dailyNorma : 0} L</h4>
       */}
      <h4>0 L</h4>
      <p>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
