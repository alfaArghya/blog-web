import zod from "zod";

export const signinInput = zod.object({
  username: zod
    .string()
    .max(20, { message: "username must be 20 or fewer characters long" }),
  password: zod
    .string()
    .min(8, { message: "password must be at least 8 characters long" }),
});
