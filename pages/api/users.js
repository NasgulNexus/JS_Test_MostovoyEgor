import { users } from "./data/users.js";

const handler = (req, res) => {
  if (req.method === "GET") {
    res.status(200).json(users);
  }
};

export default handler;
