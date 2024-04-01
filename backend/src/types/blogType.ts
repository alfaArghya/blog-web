import zod from "zod";

export const createBlogInput = zod.object({
  title: zod.string(),
  content: zod.string(),
});

export const updateBlogInput = zod.object({
  title: zod.string().optional(),
  content: zod.string().optional(),
  id: zod.string(),
});
