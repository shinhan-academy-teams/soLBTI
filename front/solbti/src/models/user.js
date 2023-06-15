import bcrypt from "bcrypt";

const setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const checkPassword = async function (password, password2) {
  const result = await bcrypt.compare(password, password2);
  return result;
};
