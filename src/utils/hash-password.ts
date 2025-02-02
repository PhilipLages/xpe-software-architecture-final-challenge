import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error("Password is required");
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
