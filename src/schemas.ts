import { z } from "zod";

import { Status, Priority } from "./constants";

export const taskFormSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().optional(),
  deadline: z.coerce.date<Date>().min(new Date(), "Deadline must be in the future"),
  status: z.enum(Status).default(Status.Todo).optional(),
  priority: z.enum(Priority).default(Priority.Low).optional(),
});

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().optional(),
  createdAt: z.coerce.date(),
  deadline: z.coerce.date(),
  status: z.enum(Status).default(Status.Todo).optional(),
  priority: z.enum(Priority).default(Priority.Low).optional(),
});
