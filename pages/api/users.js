import { users } from "./data/users.js";

const handler = (req, res) => {
  res.status(200).json(users);
};

export default handler;
