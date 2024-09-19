import { useEffect, useState, useMemo } from "react";

import CalendarLine from "./CalendarLine/CalendarLine";
import CalendarPagination from "./CalendarPagination/CalendarPagination";
import css from "./Calendar.module.css";
import Statistics from "./Statistics/Statistics";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectRecords } from "../../redux/water/selectors";
import { getRecordsThunk } from "../../redux/water/operations";
import {
  addEmptyDays,
  splitIntoChunks,
  getLast7Days,
  convertData,
} from "./helper";

const Calendar = () => {
  const [showStatistics, setShowStatistc] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const rawData = useSelector(selectRecords);
  const data = useMemo(
    () => convertData(rawData, selectedDate),
    [rawData, selectedDate]
  );

  useEffect(() => {
    dispatch(
      getRecordsThunk({ year: selectedDate.year, month: selectedDate.month })
    );
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
        month: selectedDate.month !== 0 ? selectedDate.month - 1 : 0,
      });
    }
  };

  const showStatisticsCallback = () => {
    setShowStatistc(!showStatistics);
  };

  if (isLoading || data[0] === undefined) return <p>Loading</p>;

  const chunks = splitIntoChunks(addEmptyDays(data), 7);

  return (
    <div>
      <div className={css["pagination-container"]}>
        <h3 className={css.header}>
          {showStatistics ? "Statistics" : "Month"}
        </h3>
        <CalendarPagination
          data={data}
          changeMonth={changeMonth}
          isActiveBtn={!showStatistics}
          showStatistics={showStatisticsCallback}
        />
      </div>
      {showStatistics ? (
        <Statistics data={getLast7Days(data)}></Statistics>
      ) : (
        <table className={css.container}>
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
