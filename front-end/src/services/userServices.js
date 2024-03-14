import axios from "axios";
import { API_ROUTES } from "../../constants/ROUTES";
export async function signup(data) {
  try {
    const response = await axios.post(API_ROUTES.SIGNUP, data);
    return { isSuccess: true, message: response.data.message };
  } catch (err) {
    return { isSuccess: false, message: err.response.data.message };
  }
}

export async function login(data) {
  try {
    const userData = await axios.post(API_ROUTES.LOGIN, data, {
      withCredentials: true,
    });

    return { isSuccess: true, userData: userData.data };
  } catch (err) {
    return { isSuccess: false, errorMessage: err.response.data.message };
  }
}

export async function verifyUser() {
  try {
    const userData = await axios.post(
      API_ROUTES.VERIFY_TOKEN,
      {},
      {
        withCredentials: true,
      },
    );

    return userData.data;
  } catch (err) {
    throw err;
  }
}
