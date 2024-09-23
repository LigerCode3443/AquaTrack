import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import Button from "../Button/Button";
import AddWaterForm from "../AddWaterForm/AddWaterForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import css from "./WaterMainInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecordsThunk } from "../../redux/water/operations";
import { selectTotalConsumed } from "../../redux/water/selectors";
import { selectUserWaterGoal } from "../../redux/auth/selectors";

const WaterMainInfo = () => {
  const dispatch = useDispatch();
  const userWaterGoal = useSelector(selectUserWaterGoal);
  const totalConsumed = useSelector(selectTotalConsumed);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dailyNorma = userWaterGoal || 0;
  const progress = dailyNorma > 0 ? (totalConsumed / dailyNorma) * 100 : 0;

  useEffect(() => {
    const currentDate = new Date();
    dispatch(
      getRecordsThunk({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
      })
    );
  }, [dispatch, totalConsumed]);

  return (
    <div className={css.waterTracker}>
      <h2>AquaTrack</h2>
      <WaterDailyNorma dailyNorma={dailyNorma / 1000} />
      <WaterProgressBar progress={progress} />
      <Button
        variant="secondary"
        className={css.btnAddForm}
        icon="whitePlus"
        onClick={openModal}
      >
        Add water
      </Button>
      <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <AddWaterForm />
      </ModalWindow>
    </div>
  );
};
export default WaterMainInfo;
