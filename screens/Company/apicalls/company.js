import axios from "axios";
import { api } from "../../../base";
import { SetToken } from "../../../libs/setToken";

export const getData = async (token, api_end_point) => {
  try {
    SetToken(token);
    const response = await axios.get(`${api}${api_end_point}`);
    return response?.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const getAdminPosts = async (token) => {
  try {
    SetToken(token);
    const response = await axios.get(`${api}/contestRanking`);
    return response?.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getDataById = async (token, api_end_point) => {
  console.log(token, api_end_point);
  try {
    SetToken(token);
    const response = await axios.get(`${api}${api_end_point}`);
    return response?.data;
  } catch (error) {
    console.log(error.response.data);
  }
};
