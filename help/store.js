require("dotenv").config();
const axios = require("axios");

const url = `http://db.neelr.dev/api/${process.env.STORE}`;

export const set = async (path, data) => {
  return axios.post(`${url}/${path}`, data);
};

export const get = async (path) => {
  let body = await axios.get(`${url}/${path}`);
  return body.data;
};
