const uniq = require("uniqid");
import { set } from "../../help/store";

export default async (req, res) => {
  const id = uniq();
  await set(id, req.body);
  res.json({ id });
};
