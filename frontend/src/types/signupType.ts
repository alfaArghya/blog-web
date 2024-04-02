import zod from "zod";

export const signupInput = zod.object({
  name: zod.string(),
  email: zod.string().email({ message: "Invalid email address" }),
  username: zod
    .string()
    .max(20, { message: "username must be 20 or fewer characters long" }),
  password: zod
    .string()
    .min(8, { message: "password must be at least 8 characters long" }),
});

export type SignupType = zod.infer<typeof signupInput>;
