export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;
export const getLoggedIn = state => state.auth.isLoggedIn;
export const getIsRefreshing = state => state.auth.isRefreshing;