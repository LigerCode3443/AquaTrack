import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterForm from "../AddWaterForm/AddWaterForm";
import ModalWindow from "../ModalWindow/ModalWindow";
import css from "./WaterMainInfo.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectTotalConsumed } from "../../redux/water/selectors";
import { selectUserWaterGoal } from "../../redux/auth/selectors";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useTranslation } from "react-i18next";
import LocalizationSwitcher from "../LocalizationSwitcher/LocalizationSwitcher";

const WaterMainInfo = () => {
  const { t } = useTranslation();
  const dailyNorma = useSelector(selectUserWaterGoal);
  const totalConsumed = useSelector(selectTotalConsumed);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const progress = (totalConsumed / dailyNorma) * 100;

  return (
    <div className={css.waterTracker}>
      <h2>AquaTrack</h2>
      <div className={css.header}>
        <LocalizationSwitcher />
      </div>

      <WaterDailyNorma dailyNorma={dailyNorma / 1000} />
      <WaterProgressBar progress={progress} />
      <button type="button" className={css.btnAddForm} onClick={openModal}>
        <SvgIcon className={css.btnAddFormIcon} id="plusCurrent" />
        {t("description.norma.addButtonText")}
      </button>
      <ModalWindow isOpen={isModalOpen} onClose={closeModal}>
        <AddWaterForm onClose={closeModal} />
      </ModalWindow>
    </div>
  );
};
export default WaterMainInfo;
