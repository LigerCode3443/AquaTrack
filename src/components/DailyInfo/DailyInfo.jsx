import { useEffect, useState } from "react";
import WaterList from "../WaterList/WaterList";
import AddWaterForm from "../AddWaterForm/AddWaterForm";
import EditWaterForm from "../EditWaterForm/EditWaterForm";
import DeleteWaterForm from "../DeleteWater/DeleteWater";
import s from "./DailyInfo.module.css";
import SvgIcon from "../SvgIcon/SvgIcon";
import { useDispatch, useSelector } from "react-redux";
import { getByOneDayRecordsThunk } from "../../redux/water/operations";
import ModalWindow from "../ModalWindow/ModalWindow";
import { selectOneDayRecords } from "../../redux/water/selectors";
import { useTranslation } from "react-i18next";

const DailyInfo = ({ selectedDate }) => {
  const { t } = useTranslation();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedWaterId, setSelectedWaterId] = useState(null);

  const data = useSelector(selectOneDayRecords);
  const dispatch = useDispatch();

  const handleAddWater = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const handleEditWater = (waterId) => {
    setSelectedWaterId(waterId);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedWaterId(null);
  };

  const handleDeleteWater = (waterId) => {
    setSelectedWaterId(waterId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedWaterId(null);
  };

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const day = selectedDate.getDate();

      dispatch(getByOneDayRecordsThunk({ year, month, day }));
    }
  }, [selectedDate, dispatch]);

  const months = [
    t("description.month.January"),
    t("description.month.February"),
    t("description.month.March"),
    t("description.month.April"),
    t("description.month.May"),
    t("description.month.June"),
    t("description.month.July"),
    t("description.month.August"),
    t("description.month.September"),
    t("description.month.October"),
    t("description.month.November"),
    t("description.month.December"),
  ];

  const todayCheck =
    new Date().toLocaleDateString() ===
    new Date(data.date).toLocaleDateString();

  return (
    <div className={s.dailyInfo}>
      <div className={s.header}>
        <h2>
          {todayCheck
            ? t("description.norma.todayText")
            : `${new Date(data.date).getDate()}, ${
                months[new Date(data.date).getMonth()]
              }`}
        </h2>
        <button className={s.btnPlus} onClick={handleAddWater}>
          <span className={s.circle}>
            <SvgIcon className={s.plusIcon} id="plus" width={14} height={14} />
          </span>
          <span className={s.textAdd}>
            {t("description.norma.addButtonText")}
          </span>
        </button>
      </div>

      <WaterList
        waterData={data.records}
        onEditWater={handleEditWater}
        onDeleteWater={handleDeleteWater}
      />

      <ModalWindow isOpen={isAddModalOpen} onClose={closeAddModal}>
        <AddWaterForm onClose={closeAddModal} />
      </ModalWindow>

      <ModalWindow isOpen={isEditModalOpen} onClose={closeEditModal}>
        <EditWaterForm waterId={selectedWaterId} onClose={closeEditModal} />
      </ModalWindow>

      <ModalWindow isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DeleteWaterForm waterId={selectedWaterId} onClose={closeDeleteModal} />
      </ModalWindow>
    </div>
  );
};

export default DailyInfo;
