export const selectRecords = (state) => state.water.records;

export const selectLast7Days = (state) => state.water.last7Days;

export const selectOneRecord = (state) => state.water.selectedRecord;

export const selectisError = (state) => state.water.isError;

export const selectIsLoading = (state) => state.water.isLoading;
