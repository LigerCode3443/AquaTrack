import { useState } from "react";
import AddWaterForm from "../../components/AddWaterForm/AddWaterForm";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import s from "./Tracker.module.css";
import SettingsProfile from "../../components/SettingsProfile/SettingsProfile";

const Tracker = ({ waterData, selectedDate }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className={s.wrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo date={selectedDate} waterData={waterData} />
      {/* <button
        onClick={() => {
          setAddModalOpen(true);
        }}
      >
        Test
      </button>
      <ModalWindow
        isOpen={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
        }}
      >
        <AddWaterForm />
      </ModalWindow> */}
    </div>
  );
};
export default Tracker;
