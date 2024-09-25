export const addEmptyDays = (record) => {
  const firstDayDate = new Date(record[0].date);
  firstDayDate.setDate(firstDayDate.getDate() - 1);
  const firstDayOfWeek = firstDayDate.getDay();

  const lastDayDate = new Date(record[record.length - 1].date);
  lastDayDate.setDate(lastDayDate.getDate() - 1);
  const lastDayOfWeek = lastDayDate.getDay();

  const emptyDaysAtStart = [];
  const emptyDaysAtEnd = [];

  for (let i = 0; i < firstDayOfWeek; i++) {
    emptyDaysAtStart.push({ isEmpty: true });
  }

  for (let i = lastDayOfWeek; i < 7; i++) {
    emptyDaysAtEnd.push({ isEmpty: true });
  }

  return [...emptyDaysAtStart, ...record, ...emptyDaysAtEnd];
};

export const splitIntoChunks = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  if (chunks[chunks.length - 1][0].isEmpty) chunks.splice(chunks.length - 1, 1);

  return chunks;
};

export const convertData = (rawData, date) => {
  const countDays = new Date(date.year, date.month + 1, 0).getDate();

  const newData = Array.from({ length: countDays }, (_, index) => {
    const currentDate = new Date(date.year, date.month, index + 2);

    let dailyData = {
      userWaterGoal: 0,
      date: currentDate.toISOString().split("T")[0],
      quantity: 0,
    };

    const filtered = rawData.filter((item) => {
      const itemDate = new Date(item.date);

      return itemDate.toISOString().split("T")[0] === dailyData.date;
    });

    filtered.forEach((e) => {
      dailyData = {
        ...dailyData,
        userWaterGoal: e.userWaterGoal,
        quantity: dailyData.quantity + e.quantity,
      };
    });

    return dailyData;
  });

  return newData;
};
