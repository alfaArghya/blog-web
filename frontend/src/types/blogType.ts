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

export type CreatePostType = zod.infer<typeof createBlogInput>;
export type UpdatePostType = zod.infer<typeof updateBlogInput>;

export interface BlogType {
  id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
}
