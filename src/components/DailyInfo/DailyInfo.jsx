import { useState } from "react";
import WaterList from "../WaterList/WaterList";
import AddWaterForm from "../AddWaterForm/AddWaterForm";
import EditWaterForm from "../EditWaterForm/EditWaterForm";
import DeleteWaterForm from "../DeleteWater/DeleteWater";
import s from "./DailyInfo.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useSelector } from "react-redux";
import { selectOneDayRecords } from "../../redux/water/selectors";

const DailyInfo = ({ waterData }) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWaterData, setSelectedWaterData] = useState(null);

  const data = useSelector(selectOneDayRecords);

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

  const isToday =
    new Date().toDateString() === new Date(data.date).toDateString();

  return (
    <div className={s.dailyInfo}>
      <div className={s.header}>
        <h2>{isToday ? "Today" : new Date(data.date).toLocaleDateString()}</h2>
        <button onClick={handleAddWater}>
          <SvgIcon className={s.plusIcon} id="plus" />
          Add water
        </button>
      </div>

      <WaterList
        waterData={waterData}
        onEditWater={handleEditWater}
        onDeleteWater={handleDeleteWater}
      />

      {isAddModalOpen && (
        <div className="modal">
          <AddWaterForm onClose={closeAddModal} />
        </div>
      )}

      {isEditModalOpen && selectedWaterData && (
        <div className="modal">
          <EditWaterForm
            waterEntry={selectedWaterData}
            onClose={closeEditModal}
          />
        </div>
      )}

      {isDeleteModalOpen && selectedWaterData && (
        <div className="modal">
          <DeleteWaterForm
            waterEntry={selectedWaterData}
            onClose={closeDeleteModal}
          />
        </div>
      )}
    </div>
  );
};

export default DailyInfo;
