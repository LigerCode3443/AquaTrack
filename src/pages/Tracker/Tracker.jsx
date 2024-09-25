import { useState } from "react";
import AddWaterForm from "../../components/AddWaterForm/AddWaterForm";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import s from "./Tracker.module.css";
import SettingsProfile from "../../components/SettingsProfile/SettingsProfile";

const Tracker = ({ selectedDate }) => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const waterData = [
    {
      userWaterGoal: 1500,
      date: "2024-09-17T18:09:08.000Z",
      quantity: 250,
      _id: "66e9c7ed994cd2e9ea7c177e",
    },
    {
      userWaterGoal: 1500,
      date: "2024-09-17T18:09:08.000Z",
      quantity: 250,
      _id: "66ea7d4bfad188b6b5c10cb1",
    },
    {
      userWaterGoal: 1500,
      date: "2024-09-18T07:12:20.000Z",
      quantity: 250,
      _id: "66ea7d5efad188b6b5c10cbb",
    },
    {
      userWaterGoal: 1500,
      date: "2024-09-18T07:12:20.000Z",
      quantity: 250,
      _id: "66ea7d5efad188b6b5c10cdb",
    },
  ];

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
