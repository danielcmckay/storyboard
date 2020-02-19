import { app } from "./app";
import { stories } from "./mongodb";
import {
  loginAnonymous,
  logoutCurrentUser,
  hasLoggedInUser,
  getCurrentUser,
} from "./authentication";

export { app, stories };
export { loginAnonymous, logoutCurrentUser, hasLoggedInUser, getCurrentUser };