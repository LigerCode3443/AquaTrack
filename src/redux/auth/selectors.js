export const selectUser = (state) => state.auth.user;
export const selectUserWaterGoal = (state) => state.auth.user.userWaterGoal;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefresh = (state) => state.auth.isRefresh;
export const selectIsLoading = (state) => state.auth.isLoading;
