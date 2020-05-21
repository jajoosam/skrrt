require("dotenv").config();
const Deta = require("deta");
const deta = new Deta(process.env.DETA);
export const radios = deta.Base("radios");
export const lyricCache = deta.Base("lyricCache");
