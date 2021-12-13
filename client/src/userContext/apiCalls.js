import axios from "axios";
import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "./UserActions";

export const getUsers = async (dp) => {
  dp(getUsersStart());
  try {
    const res = await axios.get("/users", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dp(getUsersSuccess(res.data));
  } catch (err) {
    dp(getUsersFailure());
  }
};

//create
export const createUser = async (user, dp) => {
  dp(createUserStart());
  try {
    const res = await axios.post("/users", user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dp(createUserSuccess(res.data));
  } catch (err) {
    dp(createUserFailure());
  }
};

//delete
export const deleteUser = async (id, dp) => {
  dp(deleteUserStart());
  try {
    await axios.delete("/users/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dp(deleteUserSuccess(id));
  } catch (err) {
    dp(deleteUserFailure());
  }
};
