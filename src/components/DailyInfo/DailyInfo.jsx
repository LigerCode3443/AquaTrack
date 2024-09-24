import { useState } from "react";
import WaterList from "../WaterList/WaterList";
import AddWaterForm from "../AddWaterForm/AddWaterForm";
import EditWaterForm from "../EditWaterForm/EditWaterForm";
import DeleteWaterForm from "../DeleteWater/DeleteWater";
import s from "./DailyInfo.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useDispatch } from "react-redux";
import {
  createWaterThunk,
  updateWaterThunk,
} from "../../redux/water/operations";
import ModalWindow from "../ModalWindow/ModalWindow";

const DailyInfo = ({ waterData, selectedDate }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWaterData, setSelectedWaterData] = useState(null);

  const data = useSelector(selectOneDayRecords);
  const dispatch = useDispatch();

  const handleAddWater = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const handleEditWater = (waterEntry) => {
    setSelectedWaterData(waterEntry);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedWaterData(null);
  };

  const handleDeleteWater = (waterEntry) => {
    setSelectedWaterData(waterEntry);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedWaterData(null);
  };
  const handleAddWaterSubmit = (waterData) => {
    dispatch(createWaterThunk(waterData)).then(() => closeAddModal());
  };

  const handleEditWaterSubmit = (waterData) => {
    dispatch(
      updateWaterThunk({ id: selectedWaterData._id, data: waterData })
    ).then(() => closeEditModal());
  };

  const isToday =
    new Date().toDateString() === new Date(data.date).toDateString();
  const isToday = selectedDate.toDateString() === new Date().toDateString();

  return (
    <div className={s.dailyInfo}>
      <div className={s.header}>
        <h2>{isToday ? "Today" : new Date(data.date).toLocaleDateString()}</h2>
        <button onClick={handleAddWater}>
          <SvgIcon className={s.plusIcon} id="plus" />
          Add water
        <h2>{isToday ? "Today" : selectedDate.toDateString()}</h2>
        <button className={s.btnPlus} onClick={handleAddWater}>
          <span className={s.circle}>
            <SvgIcon className={s.plusIcon} id="plus" />
          </span>
          <span className={s.textAdd}>Add water</span>
        </button>
      </div>

      <WaterList
        waterData={waterData}
        onEditWater={handleEditWater}
        onDeleteWater={handleDeleteWater}
      />

      {isAddModalOpen && (
        <ModalWindow isOpen={isAddModalOpen} onClose={closeAddModal}>
          <AddWaterForm
            onClose={closeAddModal}
            onSubmit={handleAddWaterSubmit}
          />
        </ModalWindow>
      )}

      {isEditModalOpen && selectedWaterData && (
        <ModalWindow isOpen={isEditModalOpen} onClose={closeEditModal}>
          <EditWaterForm
            waterEntry={selectedWaterData}
            onClose={closeEditModal}
            onSubmit={handleEditWaterSubmit}
          />
        </ModalWindow>
      )}

      {isDeleteModalOpen && selectedWaterData && (
        <ModalWindow isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
          <DeleteWaterForm
            waterEntry={selectedWaterData}
            onClose={closeDeleteModal}
          />
        </ModalWindow>
      )}
    </div>
  );
};

export default DailyInfo;
