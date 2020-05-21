import { radios } from "../../utils/store";

export default async (req, res) => {
  let radio = await radios.put(req.body);
  res.json({ id: radio.key });
};
