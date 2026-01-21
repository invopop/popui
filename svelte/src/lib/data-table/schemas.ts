import { z } from "zod/v4";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	invoice: z.string(),
	signed: z.boolean(),
	state: z.string(),
	supplier: z.string(),
	customer: z.string(),
	total: z.string(),
	createdAt: z.string(),
});

export type Task = z.output<typeof taskSchema>;