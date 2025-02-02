import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

export class Client {
  createInput: Prisma.ClientCreateInput;

  constructor(createInput: Prisma.ClientCreateInput) {
    this.createInput = createInput;
  }

  async hashPassword(): Promise<void> {
    const password = this.createInput.password;

    if (!password) {
      throw new Error("Password is required");
    }

    const salt = await bcrypt.genSalt(10);
    this.createInput.password = await bcrypt.hash(password, salt);
  }

  validateEmail(): boolean {
    const email = this.createInput.email;
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  }
}
