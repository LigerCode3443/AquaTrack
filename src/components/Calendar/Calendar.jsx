import { useEffect, useState, useMemo } from "react";

import CalendarLine from "./CalendarLine/CalendarLine";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./Calendar.module.css";
import Statistics from "./Statistics/Statistics";
import { useDispatch, useSelector } from "react-redux";
import { selectRecords } from "../../redux/water/selectors";
import {
  getLast7DaysThunk,
  getRecordsThunk,
} from "../../redux/water/operations";
import { addEmptyDays, splitIntoChunks, convertData } from "./helper";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const { t } = useTranslation();
  const [showStatistics, setShowStatistc] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const dispatch = useDispatch();
  const rawData = useSelector(selectRecords);
  const data = useMemo(
    () => convertData(rawData, selectedDate),
    [rawData, selectedDate]
  );

  useEffect(() => {
    dispatch(
      getRecordsThunk({
        year: selectedDate.year,
        month: selectedDate.month + 1,
      })
    );
    dispatch(getLast7DaysThunk());
  }, [dispatch, selectedDate.year, selectedDate.month]);

  const changeMonth = ({ next, prev }) => {
    if (next) {
      setSelectedDate({
        ...selectedDate,
        year:
          selectedDate.month !== 11 ? selectedDate.year : selectedDate.year + 1,
        month: selectedDate.month !== 11 ? selectedDate.month + 1 : 0,
      });
    } else if (prev) {
      setSelectedDate({
        ...selectedDate,
        year:
          selectedDate.month !== 0 ? selectedDate.year : selectedDate.year - 1,
        month: selectedDate.month !== 0 ? selectedDate.month - 1 : 11,
      });
    }
  };

  const showStatisticsCallback = () => {
    setShowStatistc(!showStatistics);
  };

  const chunks = splitIntoChunks(addEmptyDays(data), 7);

  const daysOfWeek = [
    t("description.day.Monday"),
    t("description.day.Tuesday"),
    t("description.day.Wednesday"),
    t("description.day.Thursday"),
    t("description.day.Friday"),
    t("description.day.Saturday"),
    t("description.day.Sunday"),
  ];

  return (
    <div>
      <div className={css["pagination-container"]}>
        <h3 className={css.header}>
          {showStatistics
            ? t("description.titles.statisticsText")
            : t("description.titles.monthText")}
        </h3>
        <CalendarPagination
          selectedDate={selectedDate}
          changeMonth={changeMonth}
          isActiveBtn={!showStatistics}
          showStatistics={showStatisticsCallback}
        />
      </div>
      {showStatistics ? (
        <Statistics />
      ) : (
        <table className={css.container}>
          <thead className={css["container-head"]}>
            <CalendarLine items={daysOfWeek} isHead={true} />
          </thead>
          <tbody className={css["container-line"]}>
            {chunks.map((elem, i) => (
              <CalendarLine key={i} items={elem} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Calendar;
